set -e

# setup
baseDir=`cd $(dirname $0) ; pwd`
cd $baseDir
rootDir=`cd ../.. ; pwd`
mkdir -p ./tmp

usage() {
  set +x
  echo
  echo "Run schemathesis contract tests against the upstream KITS."
  echo "All tests are run against the 'upgrade' API env."
  echo
  echo "Usage: $0 {a|auth|authenticate|o|org|organisation|p|person|s|sa|siti-agri|help}"
  echo
  echo "Where the argument specifies which schema to test:"
  echo "  a  | auth | authenticate - test the Authenticate schema"
  echo "  o  | org | organisation  - test the Organisation schema"
  echo "  p  | person              - test the Person schema"
  echo "  pd | payments            - test the Payment Details schema"
  echo "  s  | sa | siti-agri      - test the Siti-Agri schema"
  echo "  h  | help                - show this help message"
  echo
  echo "NOTE: additionally the following environment variables must be set:"
  echo "  KITS_KEY  - KITS client key file (path relative to project root)"
  echo "  KITS_CERT - KITS client certificate file (path relative to project root)"
  echo "  CDP_PROXY - the URL of the CDP HTTPS proxy to use"
  echo "  KITS_URL  - the URL of the KITS API to use"
  echo "or..."
  echo "  HITACHI_CLIENT_SECRET - the client secret for token generation"
}

# check OPTION argument
kits=false
case "$1" in
  h | help | --help | -h )
    usage
    exit 0
    ;;
  # KITS APIs
  a | auth | authenticate )
    schema="kits-v1/authenticate"
    mutations='. |
.paths["/external-auth/security-answers/{crn}"].get.parameters[0].schema.examples = [1105739979,1106046692,1106077237,1100932879,1105430162]'
    kits=true
    ;;
  o | org | organisation )
    schema="kits-v1/organisation"
    mutations='. |
.paths["/organisation/{organisationId}"].get.parameters[0].schema.examples = [5849659,5852711,5858233 ] |
.components.schemas.SearchRequestBody.examples[0].primarySearchPhrase = "106554744" |
.components.schemas.SearchRequestBody.examples[1].primarySearchPhrase = "200629003" |
.components.schemas.SearchRequestBody.examples[2].primarySearchPhrase = "200665008" |
.paths["/organisation/{organisationId}/lock"].post.parameters[0].schema.examples = [5583781,5849659,5852711,5858233] |
.paths["/organisation/{organisationId}/unlock"].post.parameters[0].schema.examples = [5583781,5849659,5852711,5858233]'
    kits=true
    ;;
  p | person )
    schema="kits-v1/person"
    mutations='. |
.paths["/person/{personId}/summary"].get.parameters[0].schema.examples = [5858232,5108985,5108989] |
.components.schemas.SearchRequestBody.examples[0].primarySearchPhrase = "1105658066" |
.components.schemas.SearchRequestBody.examples[1].primarySearchPhrase = "1101089857" |
.components.schemas.SearchRequestBody.examples[2].primarySearchPhrase = "1101089899"'
    kits=true
    ;;
  s | sa | siti-agri )
    schema="kits-v1/siti-agri"
    mutations='. |
.paths["/SitiAgriApi/cv/appByBusiness/sbi/{sbi}/list"].get.parameters[0].schema.examples = [121174131,200697200,107120488,117713636,200694241,200721391,119897756] |
.paths["/SitiAgriApi/cv/agreementsByBusiness/sbi/{sbi}/list"].get.parameters[0].schema.examples = [107183280,200697200,107120488,117713636,200694241] |
.paths["/SitiAgriApi/cv/cphByBusiness/sbi/{sbi}/list"].get.parameters[0].schema.examples = [121174131,200697200,107120488,117713636,200694241,200721391,119897756] |
.paths["/SitiAgriApi/cv/landUseByBusinessParcel/sheet/{sheet}/parcel/{parcel}/sbi/{sbi}/list"].get.parameters[0].schema.examples = ["SS6528","S60869","S15653"] |
.paths["/SitiAgriApi/cv/landUseByBusinessParcel/sheet/{sheet}/parcel/{parcel}/sbi/{sbi}/list"].get.parameters[1].schema.examples = [3756,8463,7211] |
.paths["/SitiAgriApi/cv/landUseByBusinessParcel/sheet/{sheet}/parcel/{parcel}/sbi/{sbi}/list"].get.parameters[2].schema.examples = [107183280]'
    kits=true
    ;;
  # Hitachi API
  pd | payments )
    schema="hitachi/payments"
    mutations='. |
.components.schemas.PaymentsRequest.properties.payment.properties.SupplierAccount.examples = ["5411707635","5305137528","4002722019"]'
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
if ${kits} ; then # KITS gateway
  echo "ERROR: Temporarily failing KITS test runs as not possible until the following"
  echo "work has been completed:"
  echo "  - mock backdoor to KITS https://eaflood.atlassian.net/browse/FCPDAL-253"
  exit 1

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

  docker run --rm --network=host --pull always \
    -v ${baseDir}/tmp:/tmp \
    -v ${KITS_KEY}:/kits.key \
    -v ${KITS_CERT}:/kits.crt \
    schemathesis/schemathesis:stable \
      run /tmp/schema.json \
        --header "email: ${TEST_USER_EMAIL:-testuser01@defra.gov.uk}" \
        --exclude-checks=unsupported_method,not_a_server_error \
        --request-cert /kits.crt \
        --request-cert-key /kits.key \
        --report-vcr-path /tmp/vcr.yaml \
        --url "${KITS_URL:-https://chs-upgrade-api.ruraldev.org.uk:8446/extapi}"

else # hitachi
  if [ -z "${HITACHI_CLIENT_SECRET}" ]; then
    echo "ERROR: HITACHI_CLIENT_SECRET environment variable is not set" 1>&2
    usage
    exit 1
  fi

  HITACHI_TOKEN=$( curl --silent --request POST \
    --url https://login.microsoftonline.com/6f504113-6b64-43f2-ade9-242e05780007/oauth2/token \
    --header 'content-type: application/x-www-form-urlencoded' \
    --data grant_type=client_credentials \
    --data client_id=ef36f4e7-126d-46df-bc9b-c608a4b1e8fe \
    --data "client_secret=${HITACHI_CLIENT_SECRET}" \
    --data resource=https://orgcf202fa2.operations.eu.dynamics.com \
    | jq -r '.access_token' )
  
  # check the token looks good
  if [ "${HITACHI_TOKEN}" = "null" ]; then
    echo "ERROR: HITACHI_TOKEN was not generated correctly, check the secret is correct" 1>&2
    usage
    exit 1
  fi

  docker run --rm --network=host --pull always \
    -v ${baseDir}/tmp:/tmp \
    schemathesis/schemathesis:stable \
      run /tmp/schema.json \
        --exclude-checks=unsupported_method,not_a_server_error \
        --header "Authorization: Bearer ${HITACHI_TOKEN}" \
        --report-vcr-path /tmp/vcr.yaml \
        --url "${HITACHI_URL:-https://orgcf202fa2.operations.eu.dynamics.com/api}"
fi

# cleanup
rm -rf ./tmp
