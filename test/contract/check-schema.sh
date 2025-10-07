set -e

# setup
baseDir=`cd $(dirname $0) ; pwd`
cd $baseDir
rootDir=`cd ../.. ; pwd`
mkdir -p ./tmp

usage() {
  set +x
  echo
  echo "Usage: $0 {p|person|o|org|organisation|a|auth|authenticate|help}"
  echo
  echo "NOTE: additionally the following environment variables must be set:"
  echo "  KITS_KEY  - KITS client key file (path relative to project root)"
  echo "  KITS_CERT - KITS client certificate file (path relative to project root)"
  echo "  CDP_PROXY - the URL of the CDP HTTPS proxy to use"
  echo "  KITS_URL  - the URL of the KITS API to use"
}

# resolve KITS_KEY
if [ -f "${KITS_KEY}" ]; then
  KITS_KEY="$(cd "$(dirname "${KITS_KEY}")" && pwd)/$(basename "${KITS_KEY}")"
elif [ -f "${rootDir}/${KITS_KEY}" ]; then
  KITS_KEY="${rootDir}/${KITS_KEY}"
else
  echo "KITS_KEY file not found: ${KITS_KEY} or ${rootDir}/${KITS_KEY}"
  usage
  exit 1
fi

# resolve KITS_CERT
if [ -f "${KITS_CERT}" ]; then
  KITS_CERT="$(cd "$(dirname "${KITS_CERT}")" && pwd)/$(basename "${KITS_CERT}")"
elif [ -f "${rootDir}/${KITS_CERT}" ]; then
  KITS_CERT="${rootDir}/${KITS_CERT}"
else
  echo "KITS_CERT file not found: ${KITS_CERT} or ${rootDir}/${KITS_CERT}"
  usage
  exit 1
fi

# check CDP_PROXY
if [ -z "${CDP_PROXY}" ]; then
  echo "CDP_PROXY environment variable not set"
  usage
  exit 1
fi

# check arguments
case "$1" in
  p | person )
    schema="person"
    mutations='. |
.paths["/person/{personId}/summary"].get.parameters[0].schema.examples = [5858232,5108985,5108989] |
.components.schemas.SearchRequestBody.examples[0].primarySearchPhrase = "1105658066" |
.components.schemas.SearchRequestBody.examples[1].primarySearchPhrase = "1101089857" |
.components.schemas.SearchRequestBody.examples[2].primarySearchPhrase = "1101089899"'
    ;;
  o | org | organisation )
    schema="organisation"
    mutations='. |
.paths["/organisation/{organisationId}"].get.parameters[0].schema.examples = [5849659,5852711,5858233 ] |
.components.schemas.SearchRequestBody.examples[0].primarySearchPhrase = "106554744" |
.components.schemas.SearchRequestBody.examples[1].primarySearchPhrase = "200629003" |
.components.schemas.SearchRequestBody.examples[2].primarySearchPhrase = "200665008" |
.paths["/organisation/{organisationId}/lock"].post.parameters[0].schema.examples = [5583781,5849659,5852711,5858233] |
.paths["/organisation/{organisationId}/unlock"].post.parameters[0].schema.examples = [5583781,5849659,5852711,5858233]'
    ;;
  a | auth | authenticate )
    schema="authenticate"
    mutations='. |
.paths["/external-auth/security-answers/{crn}"].get.parameters[0].schema.examples = [1105739979,1106046692,1106077237,1100932879,1105430162]'
    ;;
  s | sa | siti-agri )
    schema="siti-agri"
    mutations='. |
.paths["/SitiAgriApi/cv/appByBusiness/sbi/{sbi}/list"].get.parameters[0].schema.examples = [121174131,200697200,107120488,117713636,200694241,200721391,119897756] |
.paths["/SitiAgriApi/cv/agreementsByBusiness/sbi/{sbi}/list"].get.parameters[0].schema.examples = [107183280,200697200,107120488,117713636,200694241] |
.paths["/SitiAgriApi/cv/cphByBusiness/sbi/{sbi}/list"].get.parameters[0].schema.examples = [121174131,200697200,107120488,117713636,200694241,200721391,119897756]'
    ;;
  h | help | --help | -h )
    usage
    exit 0
    ;;
  *)
    echo "ERROR: Invalid argument: $1" 1>&2
    usage
    exit 1
esac

# mutate target schema - NOTE: the use of `tee` is intentional!!
yq eval -o=json "${mutations}" ${rootDir}/src/routes/${schema}-schema.oas.yml \
  | tee ./tmp/schema.json > /dev/null

# run schemathesis tests
docker run --rm --network=host --pull always \
  -v ${baseDir}/tmp:/tmp \
  -v ${KITS_KEY}:/kits.key \
  -v ${KITS_CERT}:/kits.crt \
  schemathesis/schemathesis \
    run /tmp/schema.json \
      --proxy "${CDP_PROXY}" \
      --header "email: ${TEST_USER_EMAIL:-testuser01@defra.gov.uk}" \
      --exclude-checks=unsupported_method,not_a_server_error \
      --request-cert /kits.crt \
      --request-cert-key /kits.key \
      --report-vcr-path /tmp/vcr.yaml \
      --url "${KITS_URL:-https://chs-upgrade-api.ruraldev.org.uk:8446/extapi}"

# cleanup
rm -rf ./tmp
