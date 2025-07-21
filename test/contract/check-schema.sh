set -e

# setup
baseDir=`cd $(dirname $0) ; pwd`
cd $baseDir
rootDir=`cd ../.. ; pwd`
mkdir -p ./tmp

usage() {
  set +x
  echo
  echo "Usage: $0 {person|organisation}"
  echo
  echo "NOTE: additionally the following environment variables must be set:"
  echo "  KITS_KEY  - KITS client key file (path relative to project root)"
  echo "  KITS_CERT - KITS client certificate file (path relative to project root)"
  echo "  CDP_PROXY - the URL of the CDP HTTPS proxy to use"
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
  person)
    schema="person"
    mutations='
. |
.schemes = "https" |
.paths["/person/{personId}/summary"].get.parameters[0]["x-examples"] = [5858232,5108985,5108989] |
.definitions.PartySearchRequest["x-examples"][0].primarySearchPhrase = '1105658066' |
.definitions.PartySearchRequest["x-examples"][1].primarySearchPhrase = '1101089857' |
.definitions.PartySearchRequest["x-examples"][2].primarySearchPhrase = '1101089899'
    '
    ;;
  organisation)
    schema="organisation"
    mutations='
. |
.schemes[0] = "https" |
.paths["/organisation/{organisationId}"].get.parameters[0]["x-examples"] = [5509239,5849659,5858233  ] |
.definitions.PartySearchRequest["x-examples"][0].primarySearchPhrase = '108224522' |
.definitions.PartySearchRequest["x-examples"][1].primarySearchPhrase = '200629003' |
.definitions.PartySearchRequest["x-examples"][2].primarySearchPhrase = '200665008'
    '
    ;;
  help | --help | -h)
    usage
    exit 0
    ;;
  *)
    echo "ERROR: Invalid argument: $1" 1>&2
    usage
    exit 1
esac

# mutate target schema - NOTE: the use of `tee` is intentional!!
yq eval -o=json "${mutations}" ${rootDir}/src/routes/v2/${schema}-schema.yml \
  | tee ./tmp/schema.json > /dev/null

set +e

# run schemathesis tests
docker run --rm --network=host \
  -v ${baseDir}/tmp:/tmp \
  -v ${KITS_KEY}:/kits.key \
  -v ${KITS_CERT}:/kits.crt \
  schemathesis/schemathesis \
    run /tmp/schema.json \
      --proxy "${CDP_PROXY}" \
      --header 'email: test.user01@defra.gov.uk' \
      --exclude-checks=unsupported_method \
      --request-cert /kits.crt \
      --request-cert-key /kits.key \
      --url "https://chs-upgrade-api.ruraldev.org.uk:8444/extapi"

# cleanup
rm -rf ./tmp
