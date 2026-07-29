#!/usr/bin/env bash
set -eo pipefail

# setup
baseDir=`cd $(dirname $0) ; pwd`
cd "${baseDir}"
rootDir=`cd ../.. ; pwd`

usage() {
  set +x
  echo
  echo "Run schemathesis contract tests against the upstream KITS EXTERNAL gateway."
  echo "All tests are run against the 'upgrade' API env."
  echo
  echo "Usage: $0 {perm|permissions|help}"
  echo
  echo "Where the argument specifies which schema to test:"
  echo "  perm | permissions       - test the Authorisation (Permissions) schema"
  echo "  h    | help              - show this help message"
  echo
  echo "NOTE: additionally the following environment variables must be set:"
  echo "  CDP_API_KEY - CDP Platform developer API key"
  echo "  CRN         - customer reference number for the external user under test,"
  echo "                sent as the 'crn' header and used to sign in to Defra Identity"
  echo "  KITS_EXTERNAL_URL - the URL of the KITS EXTERNAL proxy endpoint (defaults to"
  echo "                      the deployed mock's /proxy/external/extapi ephemeral route)"
  echo
  echo "The Defra Identity token is taken from DEFRA_ID_TOKEN if set; otherwise it is"
  echo "generated with scripts/get-defra-id-token.js, which needs CRN plus:"
  echo "  PASSWORD                - password for the CRN under test"
  echo "  DEFRA_ID_WELL_KNOWN_URL - OIDC discovery document for the Defra ID tenant"
  echo "  DEFRA_ID_CLIENT_ID      - Defra ID client id"
  echo "  DEFRA_ID_CLIENT_SECRET  - Defra ID client secret (the real CDP one; the local"
  echo "                            .env has no secret as the local stack uses the stub)"
  echo "  DEFRA_ID_SERVICE_ID     - Defra ID service id"
  echo "  DEFRA_ID_POLICY         - B2C policy name to run the journey against"
  echo "  DEFRA_ID_REDIRECT_URL   - registered redirect URL the journey ends on"
  echo "  DEFRA_ID_RELATIONSHIP_ID - optional; required only when the CRN is linked to"
  echo "                            more than one business"
  echo "  DEFRA_ID_DEBUG          - optional; set to print token generation stack traces"
  echo
  echo "These are normally supplied from .env.defraid via 'npm run test:contract:local:external'."
}

cleanup() {
  local status=$?
  if [ ${status} -ne 0 ] && [ -f "${baseDir}/tmp/vcr.yaml" ]; then
    echo "NOTE: report from the failed run left at ${baseDir}/tmp/vcr.yaml" 1>&2
    return
  fi
  rm -rf "${baseDir}/tmp"
}

# check OPTION argument
case "${1:-}" in
  h | help | --help | -h )
    usage
    exit 0
    ;;
  perm | permissions )
    schema="kits-v1/permissions"
    mutations='. |
.paths["/SitiAgriApi/authorisation/organisation/{orgId}/byFunction"].get.parameters[0].schema.examples = [5583781]'
    ;;
  *)
    echo "ERROR: Invalid argument: ${1:-<none>}" 1>&2
    usage
    exit 1
esac

# check required config
if [ -z "${CDP_API_KEY}" ]; then
  echo "ERROR: CDP_API_KEY environment variable is not set" 1>&2
  usage
  exit 1
fi
if [ -z "${CRN}" ]; then
  echo "ERROR: CRN environment variable is not set (needed for the 'crn' header)" 1>&2
  usage
  exit 1
fi

# from here on ./tmp exists, so it is worth arranging for it to be tidied up again
mkdir -p ./tmp
trap cleanup EXIT

yq eval -o=json -- "${mutations}" "${rootDir}/src/routes/${schema}-schema.oas.yml" \
  | tee ./tmp/schema.json > /dev/null

if [ -z "${DEFRA_ID_TOKEN}" ]; then
  echo "Generating a Defra Identity token for the external gateway..."
  DEFRA_ID_TOKEN=$( node "${rootDir}/scripts/get-defra-id-token.js" )
fi
if [ -z "${DEFRA_ID_TOKEN}" ]; then
  echo "ERROR: DEFRA_ID_TOKEN was not generated correctly" 1>&2
  usage
  exit 1
fi

# run schemathesis tests against the EXTERNAL gateway
# NOTE: endpoint-specific check exclusions are configured in schemathesis.toml
docker run --rm --network=host --pull always \
  -v "${baseDir}/tmp:/tmp" \
  -v "${baseDir}/schemathesis.toml:/tmp/schemathesis.toml:ro" \
  schemathesis/schemathesis:stable \
    --config-file /tmp/schemathesis.toml \
    run /tmp/schema.json \
      --header "x-api-key: ${CDP_API_KEY}" \
      --header "Authorization: Bearer ${DEFRA_ID_TOKEN}" \
      --header "crn: ${CRN}" \
      --exclude-checks=unsupported_method,not_a_server_error \
      --report-vcr-path /tmp/vcr.yaml \
      --url "${KITS_EXTERNAL_URL:-https://ephemeral-protected.api.dev.cdp-int.defra.cloud/fcp-dal-upstream-mock/proxy/external/extapi}"

# NOTE: cleanup of ./tmp is handled by the `cleanup` EXIT trap set above
