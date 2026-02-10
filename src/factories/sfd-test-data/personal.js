/**
 * sfdPersonLookup: Record<personId, PersonStub>
 * Keys are numeric person IDs; values are stubs merged into staticPersonData (id-lookups.js)
 * and used as overrides in person.factory.js generatePerson(personId, crn, overrides).
 * Edge-case / business test data only. Performance-test person data is in performance.js
 * and merged at sfd-test-data/index.js.
 *
 * PersonStub:
 *   - crn (string, required) — Customer Reference Number; must be present for the person to be resolvable.
 *   - Optional overrides (when absent, faker or factory defaults apply):
 *     firstName, lastName (string); middleName (string | null);
 *     dateOfBirth (number | null, UTC ms since epoch);
 *     landline, mobile, email (string | null);
 *     address (AddressStub | null).
 *
 * TODO: AddressStub:
 *   address1, address2, address3, address4, address5, street, city, county, postalCode, country, uprn. etc.
 */
export const sfdPersonLookup = {
  // SFD edge case test users - static entries for testing
  // Starting from person ID 3000000, CRN 3000000000
  // 1000-person-ID buffer between categories, 10 examples per category

  // Clean Control (3000000-3000099) - All valid data for comparison
  3000000: {
    // Clean control user - example 1
    crn: '3000000000',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000001: {
    // Clean control user - example 2
    crn: '3000000001',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000002: {
    // Clean control user - example 3
    crn: '3000000002',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000003: {
    // Clean control user - example 4
    crn: '3000000003',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000004: {
    // Clean control user - example 5
    crn: '3000000004',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000005: {
    // Clean control user - example 6
    crn: '3000000005',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000006: {
    // Clean control user - example 7
    crn: '3000000006',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000007: {
    // Clean control user - example 8
    crn: '3000000007',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000008: {
    // Clean control user - example 9
    crn: '3000000008',
    firstName: 'Clean',
    lastName: 'Control'
  },
  3000009: {
    // Clean control user - example 10
    crn: '3000000009',
    firstName: 'Clean',
    lastName: 'Control'
  },

  // Personal details edge cases (3010000-3010099) - null/empty + invalid
  // Name (3010000-3010019) - null/empty + invalid
  3010000: {
    // Name null/empty - example 1
    crn: '3010000000',
    firstName: '',
    lastName: 'invalid first name'
  },
  3010001: {
    // Name null/empty - example 2
    crn: '3010000001',
    firstName: '',
    lastName: 'invalid first name'
  },
  3010002: {
    // Name null/empty - example 3
    crn: '3010000002',
    firstName: '',
    lastName: 'invalid first name'
  },
  3010003: {
    // Name null/empty - example 4
    crn: '3010000003',
    firstName: '',
    lastName: 'invalid first name'
  },
  3010004: {
    // Name null/empty - example 5
    crn: '3010000004',
    firstName: '',
    lastName: 'invalid first name'
  },
  3010005: {
    // Name null/empty - example 6
    crn: '3010000005',
    lastName: 'invalid first name',
    firstName: ''
  },
  3010006: {
    // Name null/empty - example 7
    crn: '3010000006',
    firstName: 'invalid last name',
    lastName: ''
  },
  3010007: {
    // Name null/empty - example 8
    crn: '3010000007',
    firstName: 'invalid last name',
    lastName: ''
  },
  3010008: {
    // Name null/empty - example 9
    crn: '3010000008',
    firstName: 'invalid last name',
    lastName: ''
  },
  3010009: {
    // Name null/empty - example 10
    crn: '3010000009',
    firstName: 'invalid last name',
    lastName: ''
  },
  3010010: {
    // Name too long - example 1
    crn: '3010000010',
    firstName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    lastName: 'invalid first name'
  },
  3010011: {
    // Name too long - example 2
    crn: '3010000011',
    firstName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    lastName: 'invalid first name'
  },
  3010012: {
    // Name too long - example 3
    crn: '3010000012',
    firstName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    lastName: 'invalid first name'
  },
  3010013: {
    // Name too long - example 4
    crn: '3010000013',
    firstName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    lastName: 'invalid first name'
  },
  3010014: {
    // Name too long - example 5
    crn: '3010000014',
    firstName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    lastName: 'invalid first name'
  },
  3010015: {
    // Name too long - example 6
    crn: '3010000015',
    firstName: 'invalid last name',
    lastName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  },
  3010016: {
    // Name too long - example 7
    crn: '3010000016',
    firstName: 'invalid last name',
    lastName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  },
  3010017: {
    // Name too long - example 8
    crn: '3010000017',
    firstName: 'invalid last name',
    lastName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  },
  3010018: {
    // Name too long - example 9
    crn: '3010000018',
    firstName: 'invalid last name',
    lastName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  },
  3010019: {
    // Name too long - example 10
    crn: '3010000019',
    firstName: 'invalid last name',
    lastName:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  },
  // DOB (3010020-3010039) - null/empty + invalid
  3010020: {
    // DOB null/empty - example 1
    crn: '3010000020',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010021: {
    // DOB null/empty - example 2
    crn: '3010000021',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010022: {
    // DOB null/empty - example 3
    crn: '3010000022',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010023: {
    // DOB null/empty - example 4
    crn: '3010000023',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010024: {
    // DOB null/empty - example 5
    crn: '3010000024',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010025: {
    // DOB null/empty - example 6
    crn: '3010000025',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010026: {
    // DOB null/empty - example 7
    crn: '3010000026',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010027: {
    // DOB null/empty - example 8
    crn: '3010000027',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010028: {
    // DOB null/empty - example 9
    crn: '3010000028',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010029: {
    // DOB null/empty - example 10
    crn: '3010000029',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010030: {
    // DOB invalid - example 1 (normalized to 2030-03-02)
    crn: '3010000030',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2030-03-02T00:00:00Z').getTime()
  },
  3010031: {
    // DOB invalid - example 2 (invalid -> null)
    crn: '3010000031',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010032: {
    // DOB invalid - example 3 (invalid -> null)
    crn: '3010000032',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010033: {
    // DOB invalid - example 4 (normalized to 2025-05-01)
    crn: '3010000033',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2025-05-01T00:00:00Z').getTime()
  },
  3010034: {
    // DOB invalid - example 5 (normalized to 2025-03-01)
    crn: '3010000034',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2025-03-01T00:00:00Z').getTime()
  },
  3010035: {
    // DOB invalid - example 6 (invalid -> null)
    crn: '3010000035',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010036: {
    // DOB invalid - example 7 (invalid -> null)
    crn: '3010000036',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010037: {
    // DOB invalid - example 8 (invalid -> null)
    crn: '3010000037',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: null
  },
  3010038: {
    // DOB invalid - example 9
    crn: '3010000038',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('1800-01-01T00:00:00Z').getTime()
  },
  3010039: {
    // DOB invalid - example 10
    crn: '3010000039',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('3000-01-01T00:00:00Z').getTime()
  },

  // DOB invalid - future date (3001000-3001099)
  3001000: {
    // DOB invalid - future date - example 1 (DOB: 2030-01-01)
    crn: '3001000000',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2074-01-01T00:00:00Z').getTime()
  },
  3001001: {
    // DOB invalid - future date - example 2 (DOB: 2031-06-15)
    crn: '3001000001',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2096-06-15T00:00:00Z').getTime()
  },
  3001002: {
    // DOB invalid - future date - example 3 (DOB: 2029-12-31)
    crn: '3001000002',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2094-12-31T00:00:00Z').getTime()
  },
  3001003: {
    // DOB invalid - future date - example 4 (DOB: 2035-03-20)
    crn: '3001000003',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2035-03-20T00:00:00Z').getTime()
  },
  3001004: {
    // DOB invalid - future date - example 5 (DOB: 2040-01-01)
    crn: '3001000004',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2040-01-01T00:00:00Z').getTime()
  },
  3001005: {
    // DOB invalid - future date - example 6 (DOB: 2028-07-04)
    crn: '3001000005',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2079-07-04T00:00:00Z').getTime()
  },
  3001006: {
    // DOB invalid - future date - example 7 (DOB: 2032-11-11)
    crn: '3001000006',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2067-11-11T00:00:00Z').getTime()
  },
  3001007: {
    // DOB invalid - future date - example 8 (DOB: 2027-05-15)
    crn: '3001000007',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2088-05-15T00:00:00Z').getTime()
  },
  3001008: {
    // DOB invalid - future date - example 9 (DOB: 2033-09-30)
    crn: '3001000008',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2033-09-30T00:00:00Z').getTime()
  },
  3001009: {
    // DOB invalid - future date - example 10 (DOB: 2050-02-28)
    crn: '3001000009',
    firstName: 'Invalid',
    lastName: 'dob',
    dateOfBirth: new Date('2050-02-28T00:00:00Z').getTime()
  },

  // Missing Mandatory Address Fields (3002000-3002999) - Missing address fields
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3002000-3002099: Missing address1, street, city
  3002000: {
    // Missing address1, street, city - example 1
    crn: '3002000000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002100-3002199: Missing address1 and street
  3002100: {
    // Missing address1 and street - example 1
    crn: '3002100000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: null,
      street: null,
      city: 'Test City',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002200-3002299: Missing city and postalCode
  3002200: {
    // Missing city and postalCode - example 1
    crn: '3002200000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: '123 Test Street',
      street: 'Test Street',
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3002300-3002399: Missing address1 only
  3002300: {
    // Missing address1 only - example 1
    crn: '3002300000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: null,
      street: 'Test Street',
      city: 'Test City',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002400-3002499: Missing street only
  3002400: {
    // Missing street only - example 1
    crn: '3002400000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: '123 Test Street',
      street: null,
      city: 'Test City',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002500-3002599: Missing city only
  3002500: {
    // Missing city only - example 1
    crn: '3002500000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: '123 Test Street',
      street: 'Test Street',
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002600-3002699: Missing address1 and city
  3002600: {
    // Missing address1 and city - example 1
    crn: '3002600000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: null,
      street: 'Test Street',
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002700-3002799: Missing street and city
  3002700: {
    // Missing street and city - example 1
    crn: '3002700000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: '123 Test Street',
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3002800-3002899: Missing postalCode
  3002800: {
    // Missing postalCode - example 1
    crn: '3002800000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: '123 Test Street',
      street: 'Test Street',
      city: 'Test City',
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3002900-3002999: Missing all address fields except country
  3002900: {
    // Missing all address fields except country - example 1
    crn: '3002900000',
    firstName: 'Missing',
    lastName: 'Address',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },

  // Address (3010040-3010059) - null/empty + invalid
  3010040: {
    // Address null/empty - example 1
    crn: '3010000040',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010041: {
    // Address null/empty - example 2
    crn: '3010000041',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010042: {
    // Address null/empty - example 3
    crn: '3010000042',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010043: {
    // Address null/empty - example 4
    crn: '3010000043',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010044: {
    // Address null/empty - example 5
    crn: '3010000044',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010045: {
    // Address null/empty - example 6
    crn: '3010000045',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010046: {
    // Address null/empty - example 7
    crn: '3010000046',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010047: {
    // Address null/empty - example 8
    crn: '3010000047',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010048: {
    // Address null/empty - example 9
    crn: '3010000048',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010049: {
    // Address null/empty - example 10
    crn: '3010000049',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
      uprn: null
    }
  },
  3010050: {
    // Address invalid - example 1
    crn: '3010000050',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010051: {
    // Address invalid - example 2
    crn: '3010000051',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010052: {
    // Address invalid - example 3
    crn: '3010000052',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010053: {
    // Address invalid - example 4
    crn: '3010000053',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010054: {
    // Address invalid - example 5
    crn: '3010000054',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010055: {
    // Address invalid - example 6
    crn: '3010000055',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010056: {
    // Address invalid - example 7
    crn: '3010000056',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010057: {
    // Address invalid - example 8
    crn: '3010000057',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010058: {
    // Address invalid - example 9
    crn: '3010000058',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },
  3010059: {
    // Address invalid - example 10
    crn: '3010000059',
    firstName: 'Invalid',
    lastName: 'address',
    address: {
      address1:
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      address2: '',
      address3: '',
      address4: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      address5: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      city: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
      county: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      postalCode: 'PPPPPPPPP',
      country: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      uprn: null
    }
  },

  // Phone (3010060-3010079) - null/empty + invalid
  3010060: {
    // Phone null/empty - example 1
    crn: '3010000060',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: ''
  },
  3010061: {
    // Phone null/empty - example 2
    crn: '3010000061',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: ''
  },
  3010062: {
    // Phone null/empty - example 3
    crn: '3010000062',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: ''
  },
  3010063: {
    // Phone null/empty - example 4
    crn: '3010000063',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: ''
  },
  3010064: {
    // Phone null/empty - example 5
    crn: '3010000064',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: ''
  },
  3010065: {
    // Phone null/empty - example 6
    crn: '3010000065',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: null
  },
  3010066: {
    // Phone null/empty - example 7
    crn: '3010000066',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: null
  },
  3010067: {
    // Phone null/empty - example 8
    crn: '3010000067',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: null
  },
  3010068: {
    // Phone null/empty - example 9
    crn: '3010000068',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: null
  },
  3010069: {
    // Phone null/empty - example 10
    crn: '3010000069',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: null
  },
  3010070: {
    // Phone invalid - example 1
    crn: '3010000070',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '12345',
    mobile: null
  },
  3010071: {
    // Phone invalid - example 2
    crn: '3010000071',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: '123456789'
  },
  3010072: {
    // Phone invalid - example 3
    crn: '3010000072',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '111111111111111111111111111111111111111111111111111',
    mobile: null
  },
  3010073: {
    // Phone invalid - example 4
    crn: '3010000073',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: '222222222222222222222222222222222222222222222222222'
  },
  3010074: {
    // Phone invalid - example 5
    crn: '3010000074',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '123456789',
    mobile: null
  },
  3010075: {
    // Phone invalid - example 6
    crn: '3010000075',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: null,
    mobile: '12345'
  },
  3010076: {
    // Phone invalid - example 7
    crn: '3010000076',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '333333333333333333333333333333333333333333333333333',
    mobile: ''
  },
  3010077: {
    // Phone invalid - example 8
    crn: '3010000077',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: '444444444444444444444444444444444444444444444444444'
  },
  3010078: {
    // Phone invalid - example 9
    crn: '3010000078',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '12',
    mobile: ''
  },
  3010079: {
    // Phone invalid - example 10
    crn: '3010000079',
    firstName: 'Invalid',
    lastName: 'phone',
    landline: '',
    mobile: '34'
  },

  // Invalid Phone (3004000-3004999) - Invalid phone formats
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3004000-3004099: Invalid phone 'not-a-phone'
  3004000: {
    // Invalid phone 'not-a-phone' - example 1
    crn: '3004000000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: 'not-a-phone'
  },
  // 3004100-3004199: Too short
  3004100: {
    // Too short - example 1
    crn: '3004100000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: '123'
  },
  // 3004200-3004299: Contains letters
  3004200: {
    // Contains letters - example 1
    crn: '3004200000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: 'abc-def-ghij'
  },
  // 3004300-3004399: Special characters only
  3004300: {
    // Special characters only - example 1
    crn: '3004300000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: '!@#$%^&*()'
  },
  // 3004400-3004499: Empty string
  3004400: {
    // Empty string - example 1
    crn: '3004400000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: ''
  },
  // 3004500-3004599: Spaces only
  3004500: {
    // Spaces only - example 1
    crn: '3004500000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: '   '
  },
  // 3004600-3004699: Wrong format
  3004600: {
    // Wrong format - example 1
    crn: '3004600000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: '123-45'
  },
  // 3004700-3004799: Mixed invalid (letters and numbers)
  3004700: {
    // Mixed invalid - example 1
    crn: '3004700000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: '12abc34'
  },
  // 3004800-3004899: Too long
  3004800: {
    // Too long - example 1
    crn: '3004800000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: '12345678901234567890'
  },
  // 3004900-3004999: Null as string
  3004900: {
    // Null as string - example 1
    crn: '3004900000',
    firstName: 'Invalid',
    lastName: 'Phone',
    mobile: 'null'
  },

  // Email (3010080-3010099) - null/empty + invalid
  3010080: {
    // Email null/empty - example 1
    crn: '3010000080',
    firstName: 'Invalid',
    lastName: 'email',
    email: ''
  },
  3010081: {
    // Email null/empty - example 2
    crn: '3010000081',
    firstName: 'Invalid',
    lastName: 'email',
    email: ''
  },
  3010082: {
    // Email null/empty - example 3
    crn: '3010000082',
    firstName: 'Invalid',
    lastName: 'email',
    email: ''
  },
  3010083: {
    // Email null/empty - example 4
    crn: '3010000083',
    firstName: 'Invalid',
    lastName: 'email',
    email: ''
  },
  3010084: {
    // Email null/empty - example 5
    crn: '3010000084',
    firstName: 'Invalid',
    lastName: 'email',
    email: ''
  },
  3010085: {
    // Email null/empty - example 6
    crn: '3010000085',
    firstName: 'Invalid',
    lastName: 'email',
    email: null
  },
  3010086: {
    // Email null/empty - example 7
    crn: '3010000086',
    firstName: 'Invalid',
    lastName: 'email',
    email: null
  },
  3010087: {
    // Email null/empty - example 8
    crn: '3010000087',
    firstName: 'Invalid',
    lastName: 'email',
    email: null
  },
  3010088: {
    // Email null/empty - example 9
    crn: '3010000088',
    firstName: 'Invalid',
    lastName: 'email',
    email: null
  },
  3010089: {
    // Email null/empty - example 10
    crn: '3010000089',
    firstName: 'Invalid',
    lastName: 'email',
    email: null
  },
  3010090: {
    // Email invalid - example 1
    crn: '3010000090',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'not-an-email'
  },
  3010091: {
    // Email invalid - example 2
    crn: '3010000091',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@'
  },
  3010092: {
    // Email invalid - example 3
    crn: '3010000092',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@localhost'
  },
  3010093: {
    // Email invalid - example 4
    crn: '3010000093',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@domain.c'
  },
  3010094: {
    // Email invalid - example 5
    crn: '3010000094',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@domain'
  },
  3010095: {
    // Email invalid - example 6
    crn: '3010000095',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@domain..com'
  },
  3010096: {
    // Email invalid - example 7
    crn: '3010000096',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@@domain.com'
  },
  3010097: {
    // Email invalid - example 8
    crn: '3010000097',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user domain.com'
  },
  3010098: {
    // Email invalid - example 9
    crn: '3010000098',
    firstName: 'Invalid',
    lastName: 'email',
    email: 'user@domain.com '
  },
  3010099: {
    // Email invalid - example 10
    crn: '3010000099',
    firstName: 'Invalid',
    lastName: 'email',
    email:
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com'
  },

  // Invalid Email (3003000-3003999) - Invalid email formats
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3003000-3003099: Invalid email format 'not-an-email'
  3003000: {
    // Invalid email 'not-an-email' - example 1
    crn: '3003000000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'not-an-email'
  },
  // 3003100-3003199: Missing @ symbol
  3003100: {
    // Missing @ symbol - example 1
    crn: '3003100000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'invalidemail.com'
  },
  // 3003200-3003299: Missing domain
  3003200: {
    // Missing domain - example 1
    crn: '3003200000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'invalid@'
  },
  // 3003300-3003399: Missing local part
  3003300: {
    // Missing local part - example 1
    crn: '3003300000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: '@example.com'
  },
  // 3003400-3003499: Contains spaces
  3003400: {
    // Contains spaces - example 1
    crn: '3003400000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'invalid email@example.com'
  },
  // 3003500-3003599: Multiple @ symbols
  3003500: {
    // Multiple @ symbols - example 1
    crn: '3003500000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'invalid@@example.com'
  },
  // 3003600-3003699: No TLD
  3003600: {
    // No TLD - example 1
    crn: '3003600000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'invalid@example'
  },
  // 3003700-3003799: Just text (no @ or domain)
  3003700: {
    // Just text - example 1
    crn: '3003700000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'justtext'
  },
  // 3003800-3003899: Special characters
  3003800: {
    // Special characters - example 1
    crn: '3003800000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: 'invalid!@#$%example.com'
  },
  // 3003900-3003999: Empty string
  3003900: {
    // Empty string - example 1
    crn: '3003900000',
    firstName: 'Invalid',
    lastName: 'Email',
    email: ''
  },

  // Multiple Invalid Fields (3005000-3005999) - Multiple invalid fields
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3005000-3005099: Invalid email + phone + future DOB
  3005000: {
    // Invalid email + phone + future DOB - example 1
    crn: '3005000000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    email: 'not-an-email',
    mobile: 'not-a-phone',
    dateOfBirth: new Date('2030-01-01T00:00:00Z').getTime()
  },
  // 3005100-3005199: Invalid email + phone + missing address
  3005100: {
    // Invalid email + phone + missing address - example 1
    crn: '3005100000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    email: 'invalid@',
    mobile: '123',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3005200-3005299: Future DOB + invalid email + missing address
  3005200: {
    // Future DOB + invalid email + missing address - example 1
    crn: '3005200000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    dateOfBirth: new Date('2035-06-15T00:00:00Z').getTime(),
    email: 'bad-email',
    address: {
      address1: null,
      street: null,
      city: 'Test City',
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3005300-3005399: Invalid phone + missing address + future DOB
  3005300: {
    // Invalid phone + missing address + future DOB - example 1
    crn: '3005300000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    mobile: 'abc',
    dateOfBirth: new Date('2029-12-31T00:00:00Z').getTime(),
    address: {
      address1: null,
      street: 'Test Street',
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3005400-3005499: All invalid (email, phone, DOB, address)
  3005400: {
    // All invalid: email, phone, DOB, address - example 1
    crn: '3005400000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    email: 'invalid@@example.com',
    mobile: 'not-a-phone',
    dateOfBirth: new Date('2040-01-01T00:00:00Z').getTime(),
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3005500-3005599: Invalid email + phone
  3005500: {
    // Invalid email + phone - example 1
    crn: '3005500000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    email: 'bad@email',
    mobile: '12345'
  },
  // 3005600-3005699: Future DOB + invalid email
  3005600: {
    // Future DOB + invalid email - example 1
    crn: '3005600000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    dateOfBirth: new Date('2032-11-11T00:00:00Z').getTime(),
    email: 'invalid email@example.com'
  },
  // 3005700-3005799: Invalid phone + missing address
  3005700: {
    // Invalid phone + missing address - example 1
    crn: '3005700000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    mobile: '!@#$%',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3005800-3005899: Future DOB + missing address + invalid phone
  3005800: {
    // Future DOB + missing address + invalid phone - example 1
    crn: '3005800000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    dateOfBirth: new Date('2027-05-15T00:00:00Z').getTime(),
    mobile: 'abc123',
    address: {
      address1: null,
      street: 'Test Street',
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3005900-3005999: Invalid email + phone + future DOB + missing address
  3005900: {
    // Invalid email + phone + future DOB + missing address - example 1
    crn: '3005900000',
    firstName: 'Multiple',
    lastName: 'Invalid',
    email: '',
    mobile: '',
    dateOfBirth: new Date('2033-09-30T00:00:00Z').getTime(),
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },

  // One Field Wrong (3006000-3006999) - Single invalid field combinations
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3006000-3006099: Invalid DOB only
  3006000: {
    // Invalid DOB only - example 1
    crn: '3006000000',
    firstName: 'One',
    lastName: 'Wrong',
    dateOfBirth: new Date('2030-01-01T00:00:00Z').getTime()
  },
  // 3006100-3006199: Invalid email only
  3006100: {
    // Invalid email only - example 1
    crn: '3006100000',
    firstName: 'One',
    lastName: 'Wrong',
    email: 'not-an-email'
  },
  // 3006200-3006299: Invalid phone only
  3006200: {
    // Invalid phone only - example 1
    crn: '3006200000',
    firstName: 'One',
    lastName: 'Wrong',
    mobile: 'not-a-phone'
  },
  // 3006300-3006399: Missing address1 only
  3006300: {
    // Missing address1 only - example 1
    crn: '3006300000',
    firstName: 'One',
    lastName: 'Wrong',
    address: {
      address1: null,
      street: 'Test Street',
      city: 'Test City',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3006400-3006499: Missing street only
  3006400: {
    // Missing street only - example 1
    crn: '3006400000',
    firstName: 'One',
    lastName: 'Wrong',
    address: {
      address1: '123 Test Street',
      street: null,
      city: 'Test City',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3006500-3006599: Missing city only
  3006500: {
    // Missing city only - example 1
    crn: '3006500000',
    firstName: 'One',
    lastName: 'Wrong',
    address: {
      address1: '123 Test Street',
      street: 'Test Street',
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3006600-3006699: Missing postalCode only
  3006600: {
    // Missing postalCode only - example 1
    crn: '3006600000',
    firstName: 'One',
    lastName: 'Wrong',
    address: {
      address1: '123 Test Street',
      street: 'Test Street',
      city: 'Test City',
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3006700-3006799: Future DOB (different date)
  3006700: {
    // Future DOB (different date) - example 1
    crn: '3006700000',
    firstName: 'One',
    lastName: 'Wrong',
    dateOfBirth: new Date('2031-06-15T00:00:00Z').getTime()
  },
  // 3006800-3006899: Invalid email (different format)
  3006800: {
    // Invalid email (different format) - example 1
    crn: '3006800000',
    firstName: 'One',
    lastName: 'Wrong',
    email: 'invalid@'
  },
  // 3006900-3006999: Invalid phone (different format)
  3006900: {
    // Invalid phone (different format) - example 1
    crn: '3006900000',
    firstName: 'One',
    lastName: 'Wrong',
    mobile: '123'
  },

  // Two Fields Wrong (3007000-3007999) - Two invalid fields together
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3007000-3007099: DOB + email
  3007000: {
    // DOB + email - example 1
    crn: '3007000000',
    firstName: 'Two',
    lastName: 'Wrong',
    dateOfBirth: new Date('2030-01-01T00:00:00Z').getTime(),
    email: 'not-an-email'
  },
  // 3007100-3007199: DOB + phone
  3007100: {
    // DOB + phone - example 1
    crn: '3007100000',
    firstName: 'Two',
    lastName: 'Wrong',
    dateOfBirth: new Date('2031-06-15T00:00:00Z').getTime(),
    mobile: 'not-a-phone'
  },
  // 3007200-3007299: Address + email
  3007200: {
    // Address + email - example 1
    crn: '3007200000',
    firstName: 'Two',
    lastName: 'Wrong',
    address: {
      address1: null,
      street: null,
      city: 'Test City',
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    },
    email: 'invalid@'
  },
  // 3007300-3007399: Address + phone
  3007300: {
    // Address + phone - example 1
    crn: '3007300000',
    firstName: 'Two',
    lastName: 'Wrong',
    address: {
      address1: null,
      street: 'Test Street',
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    },
    mobile: '123'
  },
  // 3007400-3007499: Email + phone
  3007400: {
    // Email + phone - example 1
    crn: '3007400000',
    firstName: 'Two',
    lastName: 'Wrong',
    email: 'bad-email',
    mobile: 'abc'
  },
  // 3007500-3007599: DOB + address
  3007500: {
    // DOB + address - example 1
    crn: '3007500000',
    firstName: 'Two',
    lastName: 'Wrong',
    dateOfBirth: new Date('2035-03-20T00:00:00Z').getTime(),
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3007600-3007699: DOB + email (different values)
  3007600: {
    // DOB + email (different values) - example 1
    crn: '3007600000',
    firstName: 'Two',
    lastName: 'Wrong',
    dateOfBirth: new Date('2029-12-31T00:00:00Z').getTime(),
    email: 'invalid email@example.com'
  },
  // 3007700-3007799: Address + phone (different fields)
  3007700: {
    // Address + phone (different fields) - example 1
    crn: '3007700000',
    firstName: 'Two',
    lastName: 'Wrong',
    address: {
      address1: '123 Test Street',
      street: null,
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    },
    mobile: '!@#$%'
  },
  // 3007800-3007899: Email + phone (different formats)
  3007800: {
    // Email + phone (different formats) - example 1
    crn: '3007800000',
    firstName: 'Two',
    lastName: 'Wrong',
    email: 'invalid@@example.com',
    mobile: '12345'
  },
  // 3007900-3007999: DOB + address (different combinations)
  3007900: {
    // DOB + address (different combinations) - example 1
    crn: '3007900000',
    firstName: 'Two',
    lastName: 'Wrong',
    dateOfBirth: new Date('2040-01-01T00:00:00Z').getTime(),
    address: {
      address1: null,
      street: null,
      city: 'Test City',
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },

  // Three+ Fields Wrong (3008000-3008999) - Three or more invalid fields
  // 100-person-ID buffer between different scenario types to allow expansion
  // 3008000-3008099: DOB + email + phone
  3008000: {
    // DOB + email + phone - example 1
    crn: '3008000000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2030-01-01T00:00:00Z').getTime(),
    email: 'not-an-email',
    mobile: 'not-a-phone'
  },
  // 3008100-3008199: DOB + email + address
  3008100: {
    // DOB + email + address - example 1
    crn: '3008100000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2031-06-15T00:00:00Z').getTime(),
    email: 'invalid@',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3008200-3008299: DOB + phone + address
  3008200: {
    // DOB + phone + address - example 1
    crn: '3008200000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2035-03-20T00:00:00Z').getTime(),
    mobile: '123',
    address: {
      address1: null,
      street: null,
      city: 'Test City',
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3008300-3008399: Email + phone + address
  3008300: {
    // Email + phone + address - example 1
    crn: '3008300000',
    firstName: 'Three',
    lastName: 'Plus',
    email: 'bad-email',
    mobile: 'abc',
    address: {
      address1: null,
      street: 'Test Street',
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3008400-3008499: DOB + email + phone + address
  3008400: {
    // DOB + email + phone + address - example 1
    crn: '3008400000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2029-12-31T00:00:00Z').getTime(),
    email: 'invalid email@example.com',
    mobile: '!@#$%',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3008500-3008599: DOB + email + phone (different values)
  3008500: {
    // DOB + email + phone (different values) - example 1
    crn: '3008500000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2040-01-01T00:00:00Z').getTime(),
    email: 'invalid@@example.com',
    mobile: '12345'
  },
  // 3008600-3008699: DOB + email + address (different combinations)
  3008600: {
    // DOB + email + address (different combinations) - example 1
    crn: '3008600000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2028-07-04T00:00:00Z').getTime(),
    email: 'bad@email',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: 'TE1 2ST',
      country: 'England',
      uprn: null
    }
  },
  // 3008700-3008799: Email + phone + address (different fields)
  3008700: {
    // Email + phone + address (different fields) - example 1
    crn: '3008700000',
    firstName: 'Three',
    lastName: 'Plus',
    email: '',
    mobile: '',
    address: {
      address1: null,
      street: null,
      city: 'Test City',
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3008800-3008899: DOB + email + phone + address (different combinations)
  3008800: {
    // DOB + phone + address (different combinations) - example 1
    crn: '3008800000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2032-11-11T00:00:00Z').getTime(),
    email: 'invalid@',
    mobile: 'abc123',
    address: {
      address1: null,
      street: 'Test Street',
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },
  // 3008900-3008999: All four fields (DOB + email + phone + address)
  3008900: {
    // All four fields: DOB + email + phone + address - example 1
    crn: '3008900000',
    firstName: 'Three',
    lastName: 'Plus',
    dateOfBirth: new Date('2027-05-15T00:00:00Z').getTime(),
    email: 'invalid@',
    mobile: 'not-a-phone',
    address: {
      address1: null,
      street: null,
      city: null,
      postalCode: null,
      country: 'England',
      uprn: null
    }
  },

  // Person stub for the Business details test user. When the frontend signs in as CRN 3020000000
  // (see defra-id.data.json), the DAL mock resolves that user to person ID 3009100 and returns this
  // data; the user is linked to orgs 3009000–3009007 in business.js. The name "Business Details Test"
  // is intentional so it is obvious in the UI and logs which test scenario this user represents.
  3009100: {
    crn: '3020000000',
    firstName: 'Business',
    lastName: 'Details Test'
  }
}

// Person IDs that use the shared Test Org (3001458) in defra-id. Derived from sfdPersonLookup keys
// excluding 3009100 (Business Details Test). When adding a test user with org 3001458 in defra-id,
// add their person ID to sfdPersonLookup; they appear here automatically.
export const SHARED_TEST_ORG_PERSON_IDS = Object.keys(sfdPersonLookup)
  .map(Number)
  .filter((id) => id !== 3009100)
  .sort((a, b) => a - b)

