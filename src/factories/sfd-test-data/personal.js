// TODO: Add a comment here with the expected object structure

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

  // TODO: Refactor these into their own files?
  // SFD requested
  5038882: { crn: '1100388826' },
  5039001: { crn: '1100390014' },
  5039196: { crn: '1100391967' },
  5002021: { crn: '1100020217' },
  5029327: { crn: '1100293272' },
  5018617: { crn: '1100186174' },
  5039002: { crn: '1100390022' },
  5040517: { crn: '1100405178' },
  5042160: { crn: '1100421602' },
  5042346: { crn: '1100423469' },
  5069674: { crn: '1100696741' },
  // needed for SFD performance testing
  5001493: { crn: '1100014934' },
  5015829: { crn: '1100158294' },
  5041109: { crn: '1100411097' },
  5041171: { crn: '1100411712' },
  5041201: { crn: '1100412018' },
  5042682: { crn: '1100426825' },
  5043037: { crn: '1100430377' },
  5044939: { crn: '1100449396' },
  5044964: { crn: '1100449647' },
  5045445: { crn: '1100454454' },
  5045474: { crn: '1100454748' },
  5046532: { crn: '1100465324' },
  5046590: { crn: '1100465901' },
  5047414: { crn: '1100474145' },
  5048716: { crn: '1100487166' },
  5048728: { crn: '1100487289' },
  5048984: { crn: '1100489843' },
  5049069: { crn: '1100490698' },
  5049281: { crn: '1100492819' },
  5049666: { crn: '1100496661' },
  5049707: { crn: '1100497072' },
  5049815: { crn: '1100498159' },
  5051084: { crn: '1100510842' },
  5051176: { crn: '1100511768' },
  5051498: { crn: '1100514988' },
  5051873: { crn: '1100518738' },
  5052688: { crn: '1100526889' },
  5052799: { crn: '1100527990' },
  5053392: { crn: '1100533923' },
  5053942: { crn: '1100539425' },
  5054215: { crn: '1100542159' },
  5054324: { crn: '1100543244' },
  5054716: { crn: '1100547169' },
  5055225: { crn: '1100552251' },
  5055279: { crn: '1100552790' },
  5055810: { crn: '1100558101' },
  5057823: { crn: '1100578234' },
  5059058: { crn: '1100590587' },
  5059461: { crn: '1100594612' },
  5059931: { crn: '1100599312' },
  5062416: { crn: '1100624163' },
  5062599: { crn: '1100625992' },
  5064269: { crn: '1100642692' },
  5066005: { crn: '1100660054' },
  5067317: { crn: '1100673172' },
  5067639: { crn: '1100676392' },
  5068216: { crn: '1100682163' },
  5068821: { crn: '1100688218' },
  5069745: { crn: '1100697454' },
  5069958: { crn: '1100699589' },
  5070141: { crn: '1100701419' },
  5072776: { crn: '1100727760' },
  5072778: { crn: '1100727787' },
  5073586: { crn: '1100735860' },
  5073692: { crn: '1100736921' },
  5073988: { crn: '1100739882' },
  5075275: { crn: '1100752757' },
  5077829: { crn: '1100778292' },
  5078204: { crn: '1100782044' },
  5078231: { crn: '1100782311' },
  5079668: { crn: '1100796681' },
  5080733: { crn: '1100807330' },
  5083064: { crn: '1100830642' },
  5084771: { crn: '1100847715' },
  5085160: { crn: '1100851607' },
  5085354: { crn: '1100853545' },
  5086754: { crn: '1100867546' },
  5086756: { crn: '1100867562' },
  5087462: { crn: '1100874623' },
  5090033: { crn: '1100900330' },
  5093202: { crn: '1100932029' },
  5093747: { crn: '1100937471' },
  5094069: { crn: '1100940693' },
  5094581: { crn: '1100945814' },
  5095722: { crn: '1100957227' },
  5095777: { crn: '1100957774' },
  5096223: { crn: '1100962239' },
  5096628: { crn: '1100966285' },
  5096759: { crn: '1100967591' },
  5096937: { crn: '1100969373' },
  5099117: { crn: '1100991174' },
  5099126: { crn: '1100991263' },
  5100454: { crn: '1101004541' },
  5104726: { crn: '1101047267' },
  5105423: { crn: '1101054239' },
  5105967: { crn: '1101059672' },
  5108479: { crn: '1101084790' },
  5112435: { crn: '1101124350' },
  5114397: { crn: '1101143975' },
  5115113: { crn: '1101151137' },
  5117199: { crn: '1101171995' },
  5117829: { crn: '1101178299' },
  5117949: { crn: '1101179499' },
  5118809: { crn: '1101188099' },
  5118837: { crn: '1101188375' },
  5119396: { crn: '1101193964' },
  5119921: { crn: '1101199210' },
  5120038: { crn: '1101200383' },
  5123200: { crn: '1101232005' },
  5123616: { crn: '1101236167' },
  5123722: { crn: '1101237228' },
  5126549: { crn: '1101265493' },
  5126619: { crn: '1101266198' },
  5127479: { crn: '1101274794' },
  5129188: { crn: '1101291885' },
  5129856: { crn: '1101298561' },
  5130841: { crn: '1101308419' },
  5130885: { crn: '1101308850' },
  5131218: { crn: '1101312181' },
  5131442: { crn: '1101314427' },
  5131659: { crn: '1101316594' },
  5131757: { crn: '1101317574' },
  5132578: { crn: '1101325789' },
  5132996: { crn: '1101329963' },
  5137410: { crn: '1101374101' },
  5139413: { crn: '1101394137' },
  5140592: { crn: '1101405929' },
  5141260: { crn: '1101412607' },
  5141471: { crn: '1101414715' },
  5144196: { crn: '1101441968' },
  5145176: { crn: '1101451769' },
  5147067: { crn: '1101470674' },
  5147324: { crn: '1101473249' },
  5149653: { crn: '1101496533' },
  5150933: { crn: '1101509333' },
  5153887: { crn: '1101538872' },
  5154226: { crn: '1101542268' },
  5154385: { crn: '1101543859' },
  5155587: { crn: '1101555874' },
  5160786: { crn: '1101607866' },
  5160922: { crn: '1101609222' },
  5163581: { crn: '1101635819' },
  5164534: { crn: '1101645342' },
  5164868: { crn: '1101648686' },
  5166929: { crn: '1101669292' },
  5167077: { crn: '1101670770' },
  5167563: { crn: '1101675632' },
  5168947: { crn: '1101689471' },
  5172334: { crn: '1101723343' },
  5172377: { crn: '1101723777' },
  5173528: { crn: '1101735287' },
  5174141: { crn: '1101741414' },
  5175452: { crn: '1101754524' },
  5175544: { crn: '1101755449' },
  5175721: { crn: '1101757213' },
  5177933: { crn: '1101779330' },
  5178767: { crn: '1101787678' },
  5179095: { crn: '1101790954' },
  5181489: { crn: '1101814896' },
  5181619: { crn: '1101816198' },
  5181678: { crn: '1101816783' },
  5182254: { crn: '1101822546' },
  5182335: { crn: '1101823356' },
  5182576: { crn: '1101825766' },
  5182962: { crn: '1101829621' },
  5185214: { crn: '1101852143' },
  5190019: { crn: '1101900199' },
  5190360: { crn: '1101903600' },
  5191884: { crn: '1101918845' },
  5192157: { crn: '1101921579' },
  5192890: { crn: '1101928905' },
  5194730: { crn: '1101947306' },
  5194997: { crn: '1101949979' },
  5195003: { crn: '1101950039' },
  5195138: { crn: '1101951389' },
  5195498: { crn: '1101954981' },
  5195900: { crn: '1101959002' },
  5197596: { crn: '1101975962' },
  5198709: { crn: '1101987099' },
  5199010: { crn: '1101990104' },
  5199776: { crn: '1101997761' },
  5199827: { crn: '1101998279' },
  5200693: { crn: '1102006939' },
  5200766: { crn: '1102007668' },
  5201278: { crn: '1102012785' },
  5201790: { crn: '1102017906' },
  5202820: { crn: '1102028207' },
  5205262: { crn: '1102052620' },
  5206388: { crn: '1102063886' },
  5206579: { crn: '1102065799' },
  5206726: { crn: '1102067261' },
  5207222: { crn: '1102072222' },
  5207650: { crn: '1102076503' },
  5208266: { crn: '1102082669' },
  5208783: { crn: '1102087831' },
  5208801: { crn: '1102088013' },
  5209235: { crn: '1102092355' },
  5209358: { crn: '1102093580' },
  5209459: { crn: '1102094595' },
  5210953: { crn: '1102109533' },
  5211107: { crn: '1102111074' },
  5211905: { crn: '1102119059' },
  5213265: { crn: '1102132659' },
  5213526: { crn: '1102135267' },
  5216989: { crn: '1102169897' },
  5217665: { crn: '1102176656' },
  5219229: { crn: '1102192295' },
  5219857: { crn: '1102198579' },
  5223244: { crn: '1102232440' },
  5224675: { crn: '1102246751' },
  5227418: { crn: '1102274186' },
  5228709: { crn: '1102287091' },
  5229863: { crn: '1102298638' },
  5229955: { crn: '1102299553' },
  5230696: { crn: '1102306967' },
  5230708: { crn: '1102307084' },
  5232585: { crn: '1102325856' },
  5234109: { crn: '1102341096' },
  5235801: { crn: '1102358010' },
  5236021: { crn: '1102360219' },
  5236069: { crn: '1102360694' },
  5236492: { crn: '1102364924' },
  5236735: { crn: '1102367354' },
  5238622: { crn: '1102386227' },
  5239485: { crn: '1102394858' },
  5240001: { crn: '1102400017' },
  5240524: { crn: '1102405248' },
  5240681: { crn: '1102406813' },
  5240913: { crn: '1102409138' },
  5241334: { crn: '1102413348' },
  5241817: { crn: '1102418179' },
  5241935: { crn: '1102419354' },
  5242473: { crn: '1102424730' },
  5242604: { crn: '1102426040' },
  5242888: { crn: '1102428884' },
  5244275: { crn: '1102442755' },
  5245909: { crn: '1102459097' },
  5246389: { crn: '1102463892' },
  5247707: { crn: '1102477079' },
  5248993: { crn: '1102489939' },
  5251760: { crn: '1102517607' },
  5253600: { crn: '1102536008' },
  5253774: { crn: '1102537748' },
  5255295: { crn: '1102552959' },
  5255489: { crn: '1102554898' },
  5256094: { crn: '1102560944' },
  5257891: { crn: '1102578916' },
  5258241: { crn: '1102582417' },
  5258350: { crn: '1102583502' },
  5258351: { crn: '1102583510' },
  5259467: { crn: '1102594679' },
  5259494: { crn: '1102594946' },
  5260149: { crn: '1102601497' },
  5260563: { crn: '1102605638' },
  5260962: { crn: '1102609625' },
  5261008: { crn: '1102610089' },
  5261635: { crn: '1102616354' },
  5261677: { crn: '1102616779' },
  5263466: { crn: '1102634662' },
  5263802: { crn: '1102638021' },
  5264912: { crn: '1102649120' },
  5266222: { crn: '1102662224' },
  5266572: { crn: '1102665729' },
  5268012: { crn: '1102680125' },
  5268361: { crn: '1102683612' },
  5269451: { crn: '1102694517' },
  5269643: { crn: '1102696439' },
  5269870: { crn: '1102698709' },
  5270679: { crn: '1102706795' },
  5271162: { crn: '1102711624' },
  5271199: { crn: '1102711993' },
  5272974: { crn: '1102729744' },
  5273651: { crn: '1102736511' },
  5273713: { crn: '1102737135' },
  5274185: { crn: '1102741859' },
  5274981: { crn: '1102749818' },
  5275822: { crn: '1102758221' },
  5276648: { crn: '1102766488' },
  5277133: { crn: '1102771333' },
  5277732: { crn: '1102777323' },
  5277870: { crn: '1102778702' },
  5277969: { crn: '1102779695' },
  5278243: { crn: '1102782432' },
  5278670: { crn: '1102786705' },
  5279348: { crn: '1102793485' },
  5279539: { crn: '1102795399' },
  5279544: { crn: '1102795445' },
  5281526: { crn: '1102815268' },
  5281590: { crn: '1102815909' },
  5281628: { crn: '1102816280' },
  5282221: { crn: '1102822213' },
  5282849: { crn: '1102828491' },
  5283627: { crn: '1102836273' },
  5284149: { crn: '1102841498' },
  5284448: { crn: '1102844489' },
  5284783: { crn: '1102847836' },
  5287146: { crn: '1102871469' },
  5295856: { crn: '1102958565' },
  5296667: { crn: '1102966673' },
  5297090: { crn: '1102970905' },
  5298454: { crn: '1102984549' },
  5298491: { crn: '1102984914' },
  5298553: { crn: '1102985538' },
  5298907: { crn: '1102989079' },
  5300602: { crn: '1103006029' },
  5300629: { crn: '1103006290' },
  5301267: { crn: '1103012673' },
  5301349: { crn: '1103013491' },
  5301371: { crn: '1103013718' },
  5301478: { crn: '1103014781' },
  5301618: { crn: '1103016180' },
  5301871: { crn: '1103018719' },
  5301890: { crn: '1103018914' },
  5301907: { crn: '1103019074' },
  5302075: { crn: '1103020757' },
  5302215: { crn: '1103022156' },
  5302220: { crn: '1103022202' },
  5302311: { crn: '1103023119' },
  5302455: { crn: '1103024558' },
  5302461: { crn: '1103024612' },
  5302462: { crn: '1103024620' },
  5302468: { crn: '1103024689' },
  5302479: { crn: '1103024787' },
  5302483: { crn: '1103024833' },
  5302498: { crn: '1103024981' },
  5302508: { crn: '1103025082' },
  5302513: { crn: '1103025139' },
  5302524: { crn: '1103025244' },
  5302539: { crn: '1103025392' },
  5302547: { crn: '1103025473' },
  5302569: { crn: '1103025694' },
  5302578: { crn: '1103025783' },
  5302618: { crn: '1103026186' },
  5302652: { crn: '1103026526' },
  5302670: { crn: '1103026704' },
  5302674: { crn: '1103026747' },
  5302684: { crn: '1103026844' },
  5302704: { crn: '1103027042' },
  5302714: { crn: '1103027149' },
  5302751: { crn: '1103027514' },
  5302752: { crn: '1103027522' },
  5302763: { crn: '1103027638' },
  5303371: { crn: '1103033719' },
  5303460: { crn: '1103034609' },
  5303641: { crn: '1103036416' },
  5304138: { crn: '1103041389' },
  5304171: { crn: '1103041711' },
  5304365: { crn: '1103043659' },
  5304387: { crn: '1103043870' },
  5304526: { crn: '1103045261' },
  5306847: { crn: '1103068474' },
  5307155: { crn: '1103071556' },
  5307192: { crn: '1103071920' },
  5307904: { crn: '1103079042' },
  5307941: { crn: '1103079417' },
  5308034: { crn: '1103080342' },
  5308059: { crn: '1103080598' },
  5308160: { crn: '1103081608' },
  5308528: { crn: '1103085289' },
  5309487: { crn: '1103094874' },
  5309668: { crn: '1103096680' },
  5309920: { crn: '1103099205' },
  5309995: { crn: '1103099957' },
  5310559: { crn: '1103105590' },
  5310586: { crn: '1103105868' },
  5310907: { crn: '1103109073' },
  5311001: { crn: '1103110012' },
  5311351: { crn: '1103113518' },
  5311612: { crn: '1103116126' },
  5312059: { crn: '1103120599' },
  5312151: { crn: '1103121510' },
  5312954: { crn: '1103129546' },
  5313001: { crn: '1103130013' },
  5313004: { crn: '1103130048' },
  5313732: { crn: '1103137328' },
  5314290: { crn: '1103142909' },
  5314472: { crn: '1103144723' },
  5314512: { crn: '1103145126' },
  5314667: { crn: '1103146679' },
  5314742: { crn: '1103147420' },
  5314829: { crn: '1103148299' },
  5314864: { crn: '1103148648' },
  5315995: { crn: '1103159959' },
  5316145: { crn: '1103161458' },
  5316276: { crn: '1103162764' },
  5316331: { crn: '1103163310' },
  5316513: { crn: '1103165135' },
  5316576: { crn: '1103165763' },
  5316592: { crn: '1103165925' },
  5316838: { crn: '1103168389' },
  5316895: { crn: '1103168959' },
  5316947: { crn: '1103169475' },
  5318032: { crn: '1103180320' },
  5319035: { crn: '1103190350' },
  5319743: { crn: '1103197436' },
  5320158: { crn: '1103201581' },
  5320207: { crn: '1103202073' },
  5320233: { crn: '1103202332' },
  5320240: { crn: '1103202405' },
  5320271: { crn: '1103202715' },
  5320282: { crn: '1103202820' },
  5320294: { crn: '1103202944' },
  5320801: { crn: '1103208012' },
  5321023: { crn: '1103210238' },
  5321150: { crn: '1103211501' },
  5321844: { crn: '1103218441' },
  5321849: { crn: '1103218492' },
  5322046: { crn: '1103220462' },
  5322150: { crn: '1103221507' },
  5322620: { crn: '1103226207' },
  5322633: { crn: '1103226339' },
  5322932: { crn: '1103229329' },
  5323014: { crn: '1103230149' },
  5323148: { crn: '1103231480' },
  5323170: { crn: '1103231707' },
  5323501: { crn: '1103235019' },
  5323785: { crn: '1103237853' },
  5323944: { crn: '1103239449' },
  5324211: { crn: '1103242113' },
  5324518: { crn: '1103245189' },
  5324699: { crn: '1103246992' },
  5325092: { crn: '1103250922' },
  5325196: { crn: '1103251961' },
  5325250: { crn: '1103252509' },
  5325528: { crn: '1103255282' },
  5326582: { crn: '1103265822' },
  5326610: { crn: '1103266101' },
  5326666: { crn: '1103266667' },
  5326758: { crn: '1103267582' },
  5326772: { crn: '1103267728' },
  5326918: { crn: '1103269186' },
  5326961: { crn: '1103269615' },
  5326987: { crn: '1103269879' },
  5327018: { crn: '1103270184' },
  5327090: { crn: '1103270907' },
  5327209: { crn: '1103272098' },
  5327334: { crn: '1103273345' },
  5327565: { crn: '1103275658' },
  5327697: { crn: '1103276972' },
  5327857: { crn: '1103278576' },
  5328313: { crn: '1103283138' },
  5328876: { crn: '1103288768' },
  5328940: { crn: '1103289403' },
  5328965: { crn: '1103289659' },
  5329193: { crn: '1103291939' },
  5329371: { crn: '1103293710' },
  5330888: { crn: '1103308882' },
  5331010: { crn: '1103310100' },
  5331140: { crn: '1103311409' },
  5331405: { crn: '1103314059' },
  5331475: { crn: '1103314750' },
  5331849: { crn: '1103318497' },
  5332534: { crn: '1103325345' },
  5332552: { crn: '1103325523' },
  5332819: { crn: '1103328190' },
  5332835: { crn: '1103328352' },
  5332964: { crn: '1103329642' },
  5333194: { crn: '1103331949' },
  5333391: { crn: '1103333917' },
  5333996: { crn: '1103339966' },
  5334295: { crn: '1103342959' },
  5334629: { crn: '1103346296' },
  5334775: { crn: '1103347756' },
  5334973: { crn: '1103349732' },
  5335309: { crn: '1103353098' },
  5335458: { crn: '1103354582' },
  5336127: { crn: '1103361279' },
  5336166: { crn: '1103361669' },
  5336326: { crn: '1103363263' },
  5336356: { crn: '1103363565' },
  5336423: { crn: '1103364235' },
  5336517: { crn: '1103365177' },
  5336599: { crn: '1103365983' },
  5337106: { crn: '1103371061' },
  5337334: { crn: '1103373349' },
  5337375: { crn: '1103373757' },
  5338091: { crn: '1103380915' },
  5338129: { crn: '1103381296' },
  5338618: { crn: '1103386182' },
  5338761: { crn: '1103387618' },
  5338959: { crn: '1103389599' },
  5339129: { crn: '1103391291' },
  5339175: { crn: '1103391755' },
  5339391: { crn: '1103393919' },
  5339514: { crn: '1103395149' },
  5339871: { crn: '1103398717' },
  5340168: { crn: '1103401688' },
  5340339: { crn: '1103403397' },
  5340807: { crn: '1103408070' },
  5341035: { crn: '1103410350' },
  5342911: { crn: '1103429116' },
  5343317: { crn: '1103433172' },
  5343573: { crn: '1103435736' },
  5344878: { crn: '1103448781' },
  5345913: { crn: '1103459139' },
  5346401: { crn: '1103464019' },
  5346929: { crn: '1103469290' },
  5346935: { crn: '1103469355' },
  5347057: { crn: '1103470574' },
  5347383: { crn: '1103473832' },
  5610063: { crn: '1103478639' },
  5615198: { crn: '1103485806' },
  5619482: { crn: '1103528734' },
  5619509: { crn: '1103528874' },
  5619519: { crn: '1103529072' },
  5619573: { crn: '1103529501' },
  5619865: { crn: '1103532405' },
  5620095: { crn: '1103534734' },
  5620844: { crn: '1103542060' },
  5620922: { crn: '1103543199' },
  5620990: { crn: '1103543768' },
  5621186: { crn: '1103545689' },
  5626928: { crn: '1103561405' },
  5627774: { crn: '1103569902' },
  5628945: { crn: '1103581669' },
  5629249: { crn: '1103584618' },
  5629752: { crn: '1103589814' },
  5646027: { crn: '1103609165' },
  5646989: { crn: '1103618784' },
  5648849: { crn: '1103637389' },
  5649031: { crn: '1103639209' },
  5649216: { crn: '1103641050' },
  5649318: { crn: '1103642073' },
  5649668: { crn: '1103645579' },
  5649888: { crn: '1103647776' },
  5650038: { crn: '1103649272' },
  5650043: { crn: '1103649329' },
  5650066: { crn: '1103649558' },
  5650272: { crn: '1103651617' },
  5651043: { crn: '1103659324' },
  5651090: { crn: '1103659790' },
  5656803: { crn: '1103677454' },
  5657132: { crn: '1103680749' },
  5657627: { crn: '1103685694' },
  5657985: { crn: '1103689274' },
  5658499: { crn: '1103694413' },
  5658686: { crn: '1103696289' },
  5659073: { crn: '1103700154' },
  5659294: { crn: '1103702369' },
  5659579: { crn: '1103705210' },
  5660049: { crn: '1103709917' },
  5660664: { crn: '1103714686' },
  5660970: { crn: '1103717749' },
  5661209: { crn: '1103720139' },
  5661273: { crn: '1103720775' },
  5670040: { crn: '1103789228' },
  5670266: { crn: '1103791486' },
  5670321: { crn: '1103792024' },
  5670698: { crn: '1103795805' },
  5672707: { crn: '1103802089' },
  5672873: { crn: '1103803190' },
  5674498: { crn: '1103816241' },
  5676455: { crn: '1103835815' },
  5676940: { crn: '1103840665' },
  5677127: { crn: '1103842536' },
  5677405: { crn: '1103845314' },
  5681102: { crn: '1103862057' },
  5682262: { crn: '1103868365' },
  5682662: { crn: '1103871838' },
  5682960: { crn: '1103874780' },
  5683380: { crn: '1103878697' },
  5684938: { crn: '1103893939' },
  5688101: { crn: '1103925407' },
  5689694: { crn: '1103941631' },
  5690883: { crn: '1103953303' },
  5692562: { crn: '1103969349' },
  5693133: { crn: '1103974858' },
  5693784: { crn: '1103981145' },
  5695689: { crn: '1103998102' },
  5697621: { crn: '1104015927' },
  5698942: { crn: '1104026740' },
  5699077: { crn: '1104027968' },
  5700063: { crn: '1104036061' },
  5700721: { crn: '1104041561' },
  5704383: { crn: '1104072254' },
  5704714: { crn: '1104075279' },
  5704936: { crn: '1104076799' },
  5708826: { crn: '1104104032' },
  5727843: { crn: '1104286059' },
  5734385: { crn: '1104350890' },
  5754066: { crn: '1104542293' },
  5757190: { crn: '1104565277' },
  5759391: { crn: '1104584939' },
  5776307: { crn: '1104745089' },
  5806520: { crn: '1105049817' },
  5807956: { crn: '1105065081' },
  5808782: { crn: '1105080799' },
  5844816: { crn: '1105519481' },
  5847692: { crn: '1105548023' },
  5848826: { crn: '1105563839' },
  5854651: { crn: '1105622150' },
  5862639: { crn: '1105700526' },
  5866328: { crn: '1105736806' },
  5867103: { crn: '1105744175' },
  5867941: { crn: '1105752275' },
  5873780: { crn: '1105807185' },
  5874670: { crn: '1105815528' },
  5875755: { crn: '1105826023' },
  5901993: { crn: '1106081692' },
  8000001: { crn: '8000000001' },

  // TODO: Should this be here? If sowould be better further up the file
  // Business details test user — CRN 3009000000, linked to orgs 3009000–3009007
  3009100: {
    crn: '3009000000',
    firstName: 'Business',
    lastName: 'Details Test'
  }
}

