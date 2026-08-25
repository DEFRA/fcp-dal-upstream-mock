"""Schemathesis extension hooks for the contract test suite.

Loaded via the SCHEMATHESIS_HOOKS env var (see compose.yml / check-schema.sh).
"""

import time

import schemathesis

# PUT /person/{personId}: dateOfBirth must be before "now", a constraint that
# cannot be expressed in OpenAPI (see README.md "Known exceptions"). This hook
# rewrites any schema-valid dateOfBirth that lands in the future back into the
# past, so the Examples/Fuzzing phases exercise realistic payloads instead of
# tripping false positive_data_acceptance failures.
#
# NOTE: this hook has no effect during the Coverage phase - Schemathesis
# does not apply body-generation hooks there - which is why that phase is
# excluded for this operation (see compose.yml / check-schema.sh).
TARGET_METHOD = "PUT"
TARGET_PATH = "/person/{personId}"


@schemathesis.hook
def map_body(ctx, body):
    if ctx.operation.method.upper() != TARGET_METHOD or ctx.operation.path != TARGET_PATH:
        return body
    if not isinstance(body, dict):
        return body

    dob = body.get("dateOfBirth")
    now_ms = int(time.time() * 1000)

    if isinstance(dob, int) and not isinstance(dob, bool) and dob >= now_ms:
        body["dateOfBirth"] = now_ms - 1
    elif isinstance(dob, str) and dob != "":
        try:
            if int(dob) >= now_ms:
                body["dateOfBirth"] = str(now_ms - 1)
        except ValueError:
            pass

    return body
