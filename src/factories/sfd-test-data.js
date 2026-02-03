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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
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
      country: 'England'
    }
  },

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
  8000001: { crn: '8000000001' }
}

export const sfdBusinessLookup = {
  // SFD requested
  3001458: {
    sbi: 300145801,
    customers: [
      3000000, 3000001, 3000002, 3000003, 3000004, 3000005, 3000006, 3000007, 3000008, 3000009,
      3001000, 3001001, 3001002, 3001003, 3001004, 3001005, 3001006, 3001007, 3001008, 3001009,
      3002000, 3002100, 3002200, 3002300, 3002400, 3002500, 3002600, 3002700, 3002800, 3002900,
      3003000, 3003100, 3003200, 3003300, 3003400, 3003500, 3003600, 3003700, 3003800, 3003900,
      3004000, 3004100, 3004200, 3004300, 3004400, 3004500, 3004600, 3004700, 3004800, 3004900,
      3005000, 3005100, 3005200, 3005300, 3005400, 3005500, 3005600, 3005700, 3005800, 3005900,
      3006000, 3006100, 3006200, 3006300, 3006400, 3006500, 3006600, 3006700, 3006800, 3006900,
      3007000, 3007100, 3007200, 3007300, 3007400, 3007500, 3007600, 3007700, 3007800, 3007900,
      3008000, 3008100, 3008200, 3008300, 3008400, 3008500, 3008600, 3008700, 3008800, 3008900,
      3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009,
      3010010, 3010011, 3010012, 3010013, 3010014, 3010015, 3010016, 3010017, 3010018, 3010019,
      3010020, 3010021, 3010022, 3010023, 3010024, 3010025, 3010026, 3010027, 3010028, 3010029,
      3010030, 3010031, 3010032, 3010033, 3010034, 3010035, 3010036, 3010037, 3010038, 3010039,
      3010040, 3010041, 3010042, 3010043, 3010044, 3010045, 3010046, 3010047, 3010048, 3010049,
      3010050, 3010051, 3010052, 3010053, 3010054, 3010055, 3010056, 3010057, 3010058, 3010059,
      3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010068, 3010069,
      3010070, 3010071, 3010072, 3010073, 3010074, 3010075, 3010076, 3010077, 3010078, 3010079,
      3010080, 3010081, 3010082, 3010083, 3010084, 3010085, 3010086, 3010087, 3010088, 3010089,
      3010090, 3010091, 3010092, 3010093, 3010094, 3010095, 3010096, 3010097, 3010098, 3010099
    ]
  },
  5583575: { sbi: 107167406, customers: [5007704, 3001000] },
  5578463: { sbi: 107097991, customers: [5010242] },
  5501559: { sbi: 106354662, customers: [5002139] },
  5485593: { sbi: 106221605, customers: [5013725] },
  5569694: { sbi: 106440483, customers: [5038125] },
  5349873: { sbi: 112931708, customers: [5038768] },
  5452625: { sbi: 106413106, customers: [5038882] },
  5350132: { sbi: 112943154, customers: [5039001] },
  5467600: { sbi: 107310592, customers: [5039196] },
  5565032: { sbi: 107209382, customers: [5029327] },
  5364244: { sbi: 113775119, customers: [5018617] },
  5350297: { sbi: 112951133, customers: [5039002] },
  5581458: { sbi: 106734901, customers: [5002021, 3001000] },
  5561253: { sbi: 106679425, customers: [5002021] },
  5654355: { sbi: 121824295, customers: [5002021] },
  5594216: { sbi: 106718650, customers: [5002021] },
  5369113: { sbi: 106984185, customers: [5039002] },
  5579752: { sbi: 106180606, customers: [5040517] },
  5821882: { sbi: 200523665, customers: [5040517] },
  5872005: { sbi: 200716247, customers: [5042160] },
  5352457: { sbi: 113088550, customers: [5042160] },
  5352636: { sbi: 113098108, customers: [5042346] },
  5705812: { sbi: 200089578, customers: [5042346] },
  5783443: { sbi: 200384417, customers: [5042346] },
  5374662: { sbi: 114301879, customers: [5069674] },
  // needed for SFD performance testing
  5350047: { sbi: 112939363, customers: [5307941] },
  5350308: { sbi: 106770165, customers: [5307904] },
  5350465: { sbi: 112962125, customers: [5049815] },
  5350702: { sbi: 112973219, customers: [5246389] },
  5350761: { sbi: 106743899, customers: [5301371] },
  5351593: { sbi: 106816487, customers: [5182962] },
  5351713: { sbi: 113037353, customers: [5239485] },
  5352516: { sbi: 106726160, customers: [5260149] },
  5352752: { sbi: 106800924, customers: [5302462] },
  5353451: { sbi: 106782502, customers: [5331010] },
  5353534: { sbi: 113152606, customers: [5149653] },
  5353626: { sbi: 113159146, customers: [5621186] },
  5353909: { sbi: 106807603, customers: [5629249] },
  5354584: { sbi: 106789985, customers: [5263802] },
  5354695: { sbi: 113239950, customers: [5044939] },
  5354770: { sbi: 106808385, customers: [5302311] },
  5355069: { sbi: 113261686, customers: [5306847] },
  5355121: { sbi: 113263688, customers: [5045474] },
  5355413: { sbi: 113283056, customers: [5047414] },
  5355580: { sbi: 113295631, customers: [5228709] },
  5355710: { sbi: 106877469, customers: [5145176] },
  5356060: { sbi: 106790739, customers: [5302751] },
  5356305: { sbi: 106803426, customers: [5276648] },
  5356500: { sbi: 106867708, customers: [5182335] },
  5356704: { sbi: 113359239, customers: [5048716] },
  5356766: { sbi: 113363031, customers: [5300629] },
  5356925: { sbi: 113372577, customers: [5067639] },
  5357189: { sbi: 106853121, customers: [5053942] },
  5357326: { sbi: 106840498, customers: [5320233] },
  5357366: { sbi: 113394334, customers: [5178767] },
  5357803: { sbi: 113421601, customers: [5302508] },
  5358093: { sbi: 113440158, customers: [5326582] },
  5358436: { sbi: 106847601, customers: [5301871] },
  5360407: { sbi: 106928460, customers: [5660970] },
  5361438: { sbi: 113638759, customers: [5054324] },
  5361706: { sbi: 113653043, customers: [5044964] },
  5361827: { sbi: 113658765, customers: [5620922] },
  5362272: { sbi: 113680898, customers: [5302714] },
  5363342: { sbi: 113735815, customers: [5244275] },
  5364300: { sbi: 113777576, customers: [5302513] },
  5365774: { sbi: 106973989, customers: [5123200] },
  5366003: { sbi: 113857551, customers: [5211107] },
  5366312: { sbi: 106964762, customers: [5627774] },
  5366419: { sbi: 113877292, customers: [5059931] },
  5366543: { sbi: 106978096, customers: [5117199] },
  5367480: { sbi: 106971248, customers: [5181619] },
  5368049: { sbi: 106930910, customers: [5277870] },
  5368251: { sbi: 106995576, customers: [5650272] },
  5368481: { sbi: 113983188, customers: [5062416] },
  5369452: { sbi: 106993255, customers: [5258351] },
  5369776: { sbi: 106990252, customers: [5073692] },
  5370116: { sbi: 107005785, customers: [5207222] },
  5371158: { sbi: 114121018, customers: [5302578] },
  5372186: { sbi: 114173636, customers: [5272974] },
  5373449: { sbi: 114238542, customers: [5330888] },
  5374281: { sbi: 114282821, customers: [5069745] },
  5376871: { sbi: 114416662, customers: [5219857] },
  5377212: { sbi: 114433663, customers: [5048984] },
  5377215: { sbi: 107036065, customers: [5302220] },
  5377820: { sbi: 114465855, customers: [5298907] },
  5377851: { sbi: 107107926, customers: [5332835] },
  5377963: { sbi: 114472661, customers: [5307192] },
  5378988: { sbi: 114521897, customers: [5075275] },
  5379020: { sbi: 114525378, customers: [5677127] },
  5379074: { sbi: 114527256, customers: [5336356] },
  5380245: { sbi: 114582948, customers: [5326961] },
  5380288: { sbi: 114584132, customers: [5302524] },
  5381071: { sbi: 107118075, customers: [5676940] },
  5382614: { sbi: 107180163, customers: [5140592] },
  5382998: { sbi: 107143511, customers: [5304387] },
  5383242: { sbi: 107180835, customers: [5261635] },
  5384209: { sbi: 107181095, customers: [5200766] },
  5385910: { sbi: 107150782, customers: [5333391] },
  5385918: { sbi: 114888220, customers: [5260563] },
  5386659: { sbi: 107192919, customers: [5099126] },
  5387839: { sbi: 107203809, customers: [5055810] },
  5387863: { sbi: 107204504, customers: [5240913] },
  5387866: { sbi: 107233428, customers: [5657985] },
  5388734: { sbi: 115028153, customers: [5629752] },
  5388927: { sbi: 115035243, customers: [5302539] },
  5389063: { sbi: 107207814, customers: [5302652] },
  5389810: { sbi: 107205106, customers: [5105967] },
  5389901: { sbi: 107279003, customers: [5324211] },
  5389996: { sbi: 115088771, customers: [5326987] },
  5390078: { sbi: 115094176, customers: [5090033] },
  5390816: { sbi: 115150563, customers: [5336326] },
  5391027: { sbi: 115172774, customers: [5325196] },
  5391617: { sbi: 115222514, customers: [5302498] },
  5392856: { sbi: 115342392, customers: [5302618] },
  5394296: { sbi: 115465335, customers: [5096223] },
  5394557: { sbi: 115491587, customers: [5326610] },
  5394657: { sbi: 115497641, customers: [5096937] },
  5394689: { sbi: 107239549, customers: [5329371] },
  5395063: { sbi: 115535885, customers: [5660664] },
  5395781: { sbi: 107330552, customers: [5130841] },
  5395825: { sbi: 107333668, customers: [5300602] },
  5397209: { sbi: 107299757, customers: [5255489] },
  5398691: { sbi: 107289481, customers: [5258241] },
  5399615: { sbi: 115985414, customers: [5042682] },
  5400022: { sbi: 107348847, customers: [5164534] },
  5401274: { sbi: 107378343, customers: [5015829] },
  5402903: { sbi: 116352217, customers: [5099117] },
  5405021: { sbi: 116584763, customers: [5345913] },
  5407581: { sbi: 116978484, customers: [5123722] },
  5409664: { sbi: 117255745, customers: [5078231] },
  5410008: { sbi: 117300090, customers: [5129188] },
  5410498: { sbi: 117355358, customers: [5335458] },
  5411108: { sbi: 117425410, customers: [5131218] },
  5411904: { sbi: 117506953, customers: [5132578] },
  5411971: { sbi: 117513075, customers: [5235801] },
  5412402: { sbi: 117578084, customers: [5126619] },
  5415271: { sbi: 107576764, customers: [5131659] },
  5416082: { sbi: 107607501, customers: [5320158] },
  5416092: { sbi: 107611233, customers: [5200693] },
  5416157: { sbi: 107612508, customers: [5199010] },
  5416660: { sbi: 118175808, customers: [5309487] },
  5417042: { sbi: 107567934, customers: [5068216] },
  5417879: { sbi: 118354246, customers: [5339129] },
  5418035: { sbi: 118366718, customers: [5182576] },
  5418627: { sbi: 107619093, customers: [5273713] },
  5419055: { sbi: 118457514, customers: [5327334] },
  5419057: { sbi: 107622190, customers: [5046590] },
  5420148: { sbi: 107619491, customers: [5646989] },
  5421822: { sbi: 118747934, customers: [5147067] },
  5421887: { sbi: 107709720, customers: [5302547] },
  5422225: { sbi: 118783085, customers: [5154226] },
  5422503: { sbi: 118809564, customers: [5619519] },
  5423468: { sbi: 118890392, customers: [5336166] },
  5425441: { sbi: 119048451, customers: [5302468] },
  5425787: { sbi: 119078243, customers: [5302455] },
  5427029: { sbi: 119177595, customers: [5160922] },
  5429742: { sbi: 119513990, customers: [5163581] },
  5431232: { sbi: 119744034, customers: [5072778] },
  5431450: { sbi: 119768168, customers: [5172334] },
  5431823: { sbi: 119807677, customers: [5072776] },
  5432300: { sbi: 119852719, customers: [5174141] },
  5433089: { sbi: 119932704, customers: [5192157] },
  5434493: { sbi: 120075480, customers: [5301349] },
  5434632: { sbi: 120088054, customers: [5649668] },
  5435343: { sbi: 106283973, customers: [5236021] },
  5435801: { sbi: 120184869, customers: [5095777] },
  5435962: { sbi: 120197341, customers: [5118809] },
  5436814: { sbi: 106395821, customers: [5073586] },
  5438151: { sbi: 106529606, customers: [5049281] },
  5439283: { sbi: 120473881, customers: [5328965] },
  5441075: { sbi: 106919982, customers: [5320207] },
  5441528: { sbi: 120694230, customers: [5069958] },
  5442533: { sbi: 120792774, customers: [5875755] },
  5442963: { sbi: 120831873, customers: [5112435] },
  5443008: { sbi: 107179752, customers: [5277732] },
  5443124: { sbi: 107168759, customers: [5320282] },
  5444502: { sbi: 107257519, customers: [5127479] },
  5445236: { sbi: 121003668, customers: [5195138] },
  5445845: { sbi: 121061362, customers: [5168947] },
  5446176: { sbi: 121130252, customers: [5064269] },
  5446517: { sbi: 121185920, customers: [5195003] },
  5446791: { sbi: 121245181, customers: [5055225] },
  5447658: { sbi: 121468181, customers: [5211905] },
  5448790: { sbi: 106426737, customers: [5085160] },
  5449100: { sbi: 106553787, customers: [5241334] },
  5450326: { sbi: 107022980, customers: [5205262] },
  5452806: { sbi: 106494887, customers: [5334973] },
  5452830: { sbi: 106521744, customers: [5308160] },
  5452932: { sbi: 106527988, customers: [5867103] },
  5453251: { sbi: 106659045, customers: [5118837] },
  5453256: { sbi: 106666373, customers: [5268012] },
  5453347: { sbi: 106722348, customers: [5331405] },
  5453508: { sbi: 106754132, customers: [5062599] },
  5453673: { sbi: 106819297, customers: [5676455] },
  5453835: { sbi: 106838176, customers: [5051176] },
  5454715: { sbi: 107211525, customers: [5336599] },
  5455047: { sbi: 107385115, customers: [5274185] },
  5457133: { sbi: 106718400, customers: [5175544] },
  5458590: { sbi: 107263777, customers: [5268361] },
  5458987: { sbi: 107619710, customers: [5232585] },
  5459150: { sbi: 107655908, customers: [5049707] },
  5459742: { sbi: 106233197, customers: [5326772] },
  5460346: { sbi: 106453069, customers: [5230708] },
  5460462: { sbi: 106498643, customers: [5209235] },
  5460859: { sbi: 106682271, customers: [5277969] },
  5460873: { sbi: 106704825, customers: [5661209] },
  5462489: { sbi: 107315176, customers: [5695689] },
  5462747: { sbi: 107684630, customers: [5094581] },
  5464016: { sbi: 106497631, customers: [5264912] },
  5464505: { sbi: 106683591, customers: [5208801] },
  5464687: { sbi: 106736060, customers: [5117949] },
  5464870: { sbi: 106831965, customers: [5657132] },
  5465435: { sbi: 107124471, customers: [5279348] },
  5465809: { sbi: 107291680, customers: [5041201] },
  5466538: { sbi: 106744220, customers: [5862639] },
  5467971: { sbi: 110128324, customers: [5260962] },
  5469441: { sbi: 106450534, customers: [5659073] },
  5472564: { sbi: 106435351, customers: [5867941] },
  5472965: { sbi: 106487401, customers: [5213526] },
  5473638: { sbi: 110272898, customers: [5266222] },
  5474607: { sbi: 110317857, customers: [5704383] },
  5475296: { sbi: 110364194, customers: [5344878] },
  5476215: { sbi: 107123196, customers: [5650038] },
  5477882: { sbi: 107683229, customers: [5326758] },
  5480798: { sbi: 106611128, customers: [5270679] },
  5481532: { sbi: 106691341, customers: [5298491] },
  5485067: { sbi: 106645801, customers: [5610063] },
  5485181: { sbi: 106215355, customers: [5182254] },
  5485255: { sbi: 106224378, customers: [5247707] },
  5486316: { sbi: 106854963, customers: [5659579] },
  5486456: { sbi: 110767102, customers: [5199776] },
  5486492: { sbi: 110768227, customers: [5199827] },
  5487426: { sbi: 110795117, customers: [5302569] },
  5487849: { sbi: 107282598, customers: [5248993] },
  5488732: { sbi: 107614566, customers: [5325092] },
  5489412: { sbi: 106254046, customers: [5240001] },
  5489772: { sbi: 106260102, customers: [5298553] },
  5489960: { sbi: 106414880, customers: [5119396] },
  5490281: { sbi: 110883432, customers: [5313004] },
  5490635: { sbi: 110895879, customers: [5302215] },
  5490767: { sbi: 106246820, customers: [5240681] },
  5490771: { sbi: 106744402, customers: [5066005] },
  5490898: { sbi: 106264333, customers: [5648849] },
  5491027: { sbi: 107703201, customers: [5332964] },
  5491879: { sbi: 106277953, customers: [5346929] },
  5492037: { sbi: 106930271, customers: [5304526] },
  5493622: { sbi: 106334645, customers: [5206726] },
  5495188: { sbi: 111044256, customers: [5343317] },
  5496651: { sbi: 106308596, customers: [5053392] },
  5497613: { sbi: 107922148, customers: [5266572] },
  5497831: { sbi: 106340164, customers: [5301907] },
  5498367: { sbi: 107971364, customers: [5346401] },
  5500230: { sbi: 108019567, customers: [5331475] },
  5500562: { sbi: 108027486, customers: [5670266] },
  5501727: { sbi: 106354902, customers: [5241935] },
  5501769: { sbi: 108053560, customers: [5332552] },
  5501771: { sbi: 108053423, customers: [5175721] },
  5503457: { sbi: 111322867, customers: [5155587] },
  5504307: { sbi: 106387730, customers: [5141260] },
  5504324: { sbi: 106402717, customers: [5302483] },
  5505279: { sbi: 106408369, customers: [5660049] },
  5506048: { sbi: 108155712, customers: [5346935] },
  5507461: { sbi: 111431723, customers: [5227418] },
  5509509: { sbi: 111489210, customers: [5303641] },
  5510694: { sbi: 108255746, customers: [5619573] },
  5511794: { sbi: 108275900, customers: [5672707] },
  5515127: { sbi: 108343138, customers: [5327018] },
  5518341: { sbi: 106494364, customers: [5251760] },
  5520536: { sbi: 106478627, customers: [5337106] },
  5522086: { sbi: 108477971, customers: [5054215] },
  5523284: { sbi: 106488220, customers: [5068821] },
  5524926: { sbi: 106510730, customers: [5302752] },
  5525311: { sbi: 108531717, customers: [5234109] },
  5525922: { sbi: 108544610, customers: [5628945] },
  5526186: { sbi: 106517964, customers: [5672873] },
  5527172: { sbi: 111876468, customers: [5242604] },
  5528086: { sbi: 108595359, customers: [5236069] },
  5528537: { sbi: 108605705, customers: [5236492] },
  5528552: { sbi: 106530426, customers: [5302674] },
  5528720: { sbi: 111908193, customers: [5194997] },
  5528735: { sbi: 108611918, customers: [5236735] },
  5529731: { sbi: 108642163, customers: [5302704] },
  5532701: { sbi: 106551499, customers: [5177933] },
  5533132: { sbi: 106557554, customers: [5067317] },
  5537635: { sbi: 108881389, customers: [5847692] },
  5540684: { sbi: 106588276, customers: [5329193] },
  5542359: { sbi: 112369956, customers: [5263466] },
  5542776: { sbi: 106670767, customers: [5059461] },
  5545335: { sbi: 106643342, customers: [5206579] },
  5548004: { sbi: 110078541, customers: [5283627] },
  5548536: { sbi: 110090126, customers: [5259467] },
  5549131: { sbi: 112679655, customers: [5258350] },
  5549595: { sbi: 106699327, customers: [5051873] },
  5550082: { sbi: 107257018, customers: [5051084] },
  5550679: { sbi: 106680020, customers: [5048728] },
  5551774: { sbi: 112816138, customers: [5281526] },
  5551885: { sbi: 112821282, customers: [5297090] },
  5552470: { sbi: 106690818, customers: [5049666] },
  5552492: { sbi: 112851928, customers: [5150933] },
  5555587: { sbi: 121755123, customers: [5327857] },
  5556075: { sbi: 121815352, customers: [5195498] },
  5559241: { sbi: 118589831, customers: [5301267] },
  5559290: { sbi: 106828744, customers: [5301478] },
  5559409: { sbi: 106508008, customers: [5302075] },
  5559534: { sbi: 108479622, customers: [5314512] },
  5559650: { sbi: 106482576, customers: [5670321] },
  5559721: { sbi: 106268667, customers: [5314864] },
  5559990: { sbi: 106537161, customers: [5223244] },
  5560375: { sbi: 106283542, customers: [5301890] },
  5560837: { sbi: 107278569, customers: [5084771] },
  5561112: { sbi: 106321003, customers: [5314829] },
  5561126: { sbi: 106734581, customers: [5120038] },
  5561195: { sbi: 106173037, customers: [5650066] },
  5561263: { sbi: 115203919, customers: [5313001] },
  5561521: { sbi: 106813576, customers: [5043037] },
  5561767: { sbi: 106769082, customers: [5682262] },
  5562000: { sbi: 106745824, customers: [5314472] },
  5562188: { sbi: 106788483, customers: [5323944] },
  5562291: { sbi: 106814975, customers: [5626928] },
  5562306: { sbi: 106811552, customers: [5164868] },
  5562412: { sbi: 106809683, customers: [5259494] },
  5562476: { sbi: 106822292, customers: [5302684] },
  5562736: { sbi: 106876424, customers: [5326918] },
  5562749: { sbi: 106847838, customers: [5086754] },
  5563801: { sbi: 106991776, customers: [5319743] },
  5563870: { sbi: 107072538, customers: [5316895] },
  5563995: { sbi: 107053784, customers: [5620990] },
  5564249: { sbi: 114371976, customers: [5700063] },
  5564374: { sbi: 114444336, customers: [5057823] },
  5564792: { sbi: 107146821, customers: [5208783] },
  5565300: { sbi: 107285409, customers: [5866328] },
  5565722: { sbi: 115651444, customers: [5201790] },
  5565773: { sbi: 107111762, customers: [5153887] },
  5565790: { sbi: 115742476, customers: [5172377] },
  5566193: { sbi: 116324278, customers: [5312151] },
  5566298: { sbi: 107104934, customers: [5311351] },
  5566878: { sbi: 107616977, customers: [5046532] },
  5567707: { sbi: 106469023, customers: [5117829] },
  5567710: { sbi: 106277076, customers: [5302763] },
  5568235: { sbi: 106452057, customers: [5179095] },
  5568997: { sbi: 107200010, customers: [5086756] },
  5569163: { sbi: 106385614, customers: [5313732] },
  5569274: { sbi: 106615974, customers: [5334775] },
  5570059: { sbi: 106744823, customers: [5338129] },
  5570126: { sbi: 106880534, customers: [5302670] },
  5570147: { sbi: 106954895, customers: [5338959] },
  5570378: { sbi: 106907067, customers: [5321150] },
  5570483: { sbi: 106255161, customers: [5325250] },
  5570582: { sbi: 106348311, customers: [5308059] },
  5570652: { sbi: 106560526, customers: [5301618] },
  5570828: { sbi: 106966467, customers: [5201278] },
  5570867: { sbi: 107119167, customers: [5776307] },
  5570985: { sbi: 107545766, customers: [5677405] },
  5571333: { sbi: 106533281, customers: [5207650] },
  5571501: { sbi: 106879494, customers: [5619865] },
  5571567: { sbi: 107143646, customers: [5339514] },
  5571793: { sbi: 106772065, customers: [5311612] },
  5571921: { sbi: 106546970, customers: [5339871] },
  5572150: { sbi: 107362551, customers: [5323785] },
  5572893: { sbi: 106701343, customers: [5327090] },
  5573228: { sbi: 106206899, customers: [5670040] },
  5573283: { sbi: 106170580, customers: [5338091] },
  5573300: { sbi: 106662983, customers: [5281628] },
  5573412: { sbi: 106172753, customers: [5697621] },
  5573543: { sbi: 106392065, customers: [5213265] },
  5573638: { sbi: 106542226, customers: [5147324] },
  5573651: { sbi: 106195022, customers: [5874670] },
  5573690: { sbi: 106543615, customers: [5041109] },
  5573855: { sbi: 106544570, customers: [5261677] },
  5573959: { sbi: 106693559, customers: [5310907] },
  5574095: { sbi: 106238421, customers: [5316145] },
  5574608: { sbi: 106280969, customers: [5338761] },
  5574753: { sbi: 106296251, customers: [5303460] },
  5574856: { sbi: 106307389, customers: [5275822] },
  5575022: { sbi: 106337875, customers: [5343573] },
  5575098: { sbi: 106345443, customers: [5131757] },
  5575144: { sbi: 106336567, customers: [5328940] },
  5575265: { sbi: 106355607, customers: [5323501] },
  5575273: { sbi: 106444465, customers: [5194730] },
  5575343: { sbi: 106554573, customers: [5854651] },
  5575398: { sbi: 106395854, customers: [5087462] },
  5575474: { sbi: 106402330, customers: [5312954] },
  5575563: { sbi: 106712654, customers: [5322620] },
  5575714: { sbi: 111508601, customers: [5322932] },
  5575726: { sbi: 106531768, customers: [5323148] },
  5576211: { sbi: 106491577, customers: [5651090] },
  5576222: { sbi: 111815829, customers: [5316513] },
  5576340: { sbi: 108579872, customers: [5052799] },
  5576562: { sbi: 112022127, customers: [5331849] },
  5576611: { sbi: 112048662, customers: [5333996] },
  5576711: { sbi: 112140643, customers: [5242473] },
  5576830: { sbi: 106590522, customers: [5316838] },
  5576926: { sbi: 106604107, customers: [5320801] },
  5577039: { sbi: 106629082, customers: [5315995] },
  5577177: { sbi: 106659216, customers: [5674498] },
  5577211: { sbi: 106695323, customers: [5320240] },
  5577252: { sbi: 106644070, customers: [5808782] },
  5577529: { sbi: 106685332, customers: [5316276] },
  5577532: { sbi: 106733911, customers: [5323014] },
  5578355: { sbi: 106703221, customers: [5322046] },
  5578380: { sbi: 106175017, customers: [5322150] },
  5578476: { sbi: 106416121, customers: [5224675] },
  5578636: { sbi: 106769641, customers: [5339175] },
  5578711: { sbi: 106808762, customers: [5055279] },
  5578791: { sbi: 106891003, customers: [5661273] },
  5579047: { sbi: 107355244, customers: [5339391] },
  5579112: { sbi: 107577925, customers: [5051498] },
  5579165: { sbi: 106331210, customers: [5319035] },
  5579545: { sbi: 107337764, customers: [5132996] },
  5579673: { sbi: 106612813, customers: [5727843] },
  5579750: { sbi: 107062978, customers: [5308034] },
  5579860: { sbi: 107362506, customers: [5303371] },
  5580039: { sbi: 106564871, customers: [5269643] },
  5580189: { sbi: 106384646, customers: [5130885] },
  5581243: { sbi: 106293156, customers: [5278243] },
  5581342: { sbi: 106690738, customers: [5059058] },
  5581579: { sbi: 122015700, customers: [5312059] },
  5582478: { sbi: 106403331, customers: [5658499] },
  5582558: { sbi: 106927210, customers: [5261008] },
  5582585: { sbi: 106873432, customers: [5210953] },
  5583350: { sbi: 107024447, customers: [5693133] },
  5583367: { sbi: 106986939, customers: [5154385] },
  5583476: { sbi: 114527940, customers: [5096628] },
  5583506: { sbi: 107523588, customers: [5308528] },
  5583824: { sbi: 106581348, customers: [5302461] },
  5584010: { sbi: 106539425, customers: [5271199] },
  5584406: { sbi: 106696277, customers: [5209358] },
  5584771: { sbi: 106220819, customers: [5336517] },
  5584859: { sbi: 107043623, customers: [5314290] },
  5584907: { sbi: 107327693, customers: [5302479] },
  5584982: { sbi: 106605244, customers: [5336127] },
  5585026: { sbi: 106759364, customers: [5079668] },
  5585128: { sbi: 106397242, customers: [5321844] },
  5585140: { sbi: 106390815, customers: [5683380] },
  5585300: { sbi: 106210054, customers: [5327209] },
  5585374: { sbi: 107544969, customers: [5105423] },
  5585493: { sbi: 106212648, customers: [5123616] },
  5585704: { sbi: 111659717, customers: [5332534] },
  5585832: { sbi: 114932941, customers: [5279539] },
  5585852: { sbi: 106970441, customers: [5052688] },
  5586014: { sbi: 106538117, customers: [5316331] },
  5586608: { sbi: 106514643, customers: [5198709] },
  5586650: { sbi: 106249468, customers: [5324699] },
  5586710: { sbi: 106318510, customers: [5332819] },
  5586918: { sbi: 118304520, customers: [5114397] },
  5586934: { sbi: 106513118, customers: [5238622] },
  5587307: { sbi: 107580646, customers: [5241817] },
  5587663: { sbi: 110271205, customers: [5202820] },
  5587822: { sbi: 106253001, customers: [5070141] },
  5587838: { sbi: 106451831, customers: [5271162] },
  5587849: { sbi: 106774568, customers: [5334629] },
  5587871: { sbi: 106364573, customers: [5658686] },
  5588000: { sbi: 106865773, customers: [5284783] },
  5588103: { sbi: 106841262, customers: [5049069] },
  5588824: { sbi: 106207754, customers: [5256094] },
  5588840: { sbi: 106662927, customers: [5322633] },
  5588900: { sbi: 106325187, customers: [5321023] },
  5589427: { sbi: 106609293, customers: [5807956] },
  5589520: { sbi: 106765705, customers: [5316576] },
  5590024: { sbi: 106196136, customers: [5230696] },
  5591170: { sbi: 106234939, customers: [5219229] },
  5591494: { sbi: 106638389, customers: [5327565] },
  5591886: { sbi: 114932963, customers: [5279544] },
  5592495: { sbi: 106926801, customers: [5311001] },
  5592695: { sbi: 106783649, customers: [5759391] },
  5592957: { sbi: 106424392, customers: [5754066] },
  5593088: { sbi: 106637970, customers: [5310559] },
  5593163: { sbi: 106671859, customers: [5309668] },
  5593368: { sbi: 106729857, customers: [5688101] },
  5593451: { sbi: 107105398, customers: [5240524] },
  5593979: { sbi: 106246955, customers: [5278670] },
  5594087: { sbi: 115498050, customers: [5331140] },
  5594730: { sbi: 106602811, customers: [5167077] },
  5594925: { sbi: 106486433, customers: [5093202] },
  5595244: { sbi: 106438833, customers: [5131442] },
  5595388: { sbi: 106630483, customers: [5108479] },
  5595758: { sbi: 107697919, customers: [5229955] },
  5595831: { sbi: 106603491, customers: [5693784] },
  5596380: { sbi: 114637830, customers: [5078204] },
  5596764: { sbi: 106854974, customers: [5337334] },
  5596916: { sbi: 106537822, customers: [5873780] },
  5596927: { sbi: 106401442, customers: [5190360] },
  5596938: { sbi: 106795233, customers: [5085354] },
  5596951: { sbi: 107047013, customers: [5649888] },
  5598053: { sbi: 106625749, customers: [5309995] },
  5598420: { sbi: 113757550, customers: [5316947] },
  5598461: { sbi: 106220329, customers: [5139413] },
  5598635: { sbi: 106878701, customers: [5282221] },
  5598843: { sbi: 107670805, customers: [5333194] },
  5599010: { sbi: 106591453, customers: [5848826] },
  5599152: { sbi: 106811927, customers: [5209459] },
  5599197: { sbi: 111862019, customers: [5115113] },
  5599504: { sbi: 106848533, customers: [5277133] },
  5599588: { sbi: 106924627, customers: [5341035] },
  5599672: { sbi: 106889065, customers: [5192890] },
  5600105: { sbi: 107193829, customers: [5347057] },
  5601832: { sbi: 106779459, customers: [5304171] },
  5602770: { sbi: 106712632, customers: [5104726] },
  5603726: { sbi: 106424198, customers: [5208266] },
  5603992: { sbi: 112644799, customers: [5274981] },
  5604207: { sbi: 110535236, customers: [5615198] },
  5604452: { sbi: 106705779, customers: [5001493] },
  5604693: { sbi: 107124972, customers: [5340339] },
  5606521: { sbi: 106361558, customers: [5704936] },
  5606633: { sbi: 106263081, customers: [5682662] },
  5613811: { sbi: 106588298, customers: [5298454] },
  5613879: { sbi: 106327021, customers: [5282849] },
  5613933: { sbi: 106829222, customers: [5328876] },
  5625277: { sbi: 110553046, customers: [5342911] },
  5625315: { sbi: 107062295, customers: [5318032] },
  5625399: { sbi: 106443442, customers: [5806520] },
  5625504: { sbi: 106691318, customers: [5310586] },
  5631379: { sbi: 106766637, customers: [5096759] },
  5632110: { sbi: 107060670, customers: [5334295] },
  5632326: { sbi: 107210966, customers: [5257891] },
  5633021: { sbi: 121020896, customers: [5273651] },
  5633290: { sbi: 106821850, customers: [5041171] },
  5633363: { sbi: 107045237, customers: [5253600] },
  5634199: { sbi: 107160626, customers: [5281590] },
  5634244: { sbi: 106226702, customers: [5304138] },
  5634321: { sbi: 106348173, customers: [5126549] },
  5634377: { sbi: 106206991, customers: [5144196] },
  5635514: { sbi: 106486159, customers: [5656803] },
  5636634: { sbi: 107346173, customers: [5173528] },
  5636640: { sbi: 106531893, customers: [5255295] },
  5636882: { sbi: 122264757, customers: [5649318] },
  5637651: { sbi: 111386363, customers: [5284448] },
  5637856: { sbi: 106860621, customers: [5253774] },
  5652026: { sbi: 122385434, customers: [5646027] },
  5652860: { sbi: 106590145, customers: [5320271] },
  5653268: { sbi: 107349187, customers: [5327697] },
  5653420: { sbi: 106294066, customers: [5328313] },
  5653499: { sbi: 113760873, customers: [5649031] },
  5653507: { sbi: 113655170, customers: [5054716] },
  5653543: { sbi: 107072834, customers: [5175452] },
  5653696: { sbi: 107623066, customers: [5649216] },
  5654106: { sbi: 106308051, customers: [5340807] },
  5654282: { sbi: 106674590, customers: [5650043] },
  5654283: { sbi: 112880558, customers: [5284149] },
  5655095: { sbi: 122394399, customers: [5073988] },
  5655296: { sbi: 106275780, customers: [5651043] },
  5671306: { sbi: 122547019, customers: [5670698] },
  5673936: { sbi: 122578803, customers: [5245909] },
  5679063: { sbi: 114570045, customers: [5077829] },
  5679147: { sbi: 115734330, customers: [5100454] },
  5679179: { sbi: 118444563, customers: [5659294] },
  5681759: { sbi: 106453149, customers: [5657627] },
  5685316: { sbi: 200010755, customers: [5166929] },
  5686223: { sbi: 200012833, customers: [5309920] },
  5690945: { sbi: 200030088, customers: [5690883] },
  5698977: { sbi: 200061020, customers: [5698942] },
  5699087: { sbi: 200061371, customers: [5699077] },
  5700738: { sbi: 200066731, customers: [5700721] },
  5701455: { sbi: 200072181, customers: [5314742] },
  5701486: { sbi: 200072272, customers: [5095722] },
  5708833: { sbi: 200099148, customers: [5708826] },
  5709264: { sbi: 200100868, customers: [5620095] },
  5712903: { sbi: 200114283, customers: [5338618] },
  5713733: { sbi: 200117618, customers: [5094069] },
  5718263: { sbi: 200135119, customers: [5619482] },
  5718365: { sbi: 200135448, customers: [5141471] },
  5719590: { sbi: 200140423, customers: [5689694] },
  5733277: { sbi: 200199742, customers: [5844816] },
  5737331: { sbi: 200212589, customers: [5314667] },
  5739214: { sbi: 200219893, customers: [5304365] },
  5741371: { sbi: 200228861, customers: [5337375] },
  5741734: { sbi: 200230046, customers: [5083064] },
  5742006: { sbi: 200231003, customers: [5681102] },
  5743595: { sbi: 200235815, customers: [5320294] },
  5745026: { sbi: 200240220, customers: [5242888] },
  5747678: { sbi: 200249855, customers: [5620844] },
  5751660: { sbi: 200265106, customers: [5216989] },
  5754110: { sbi: 200274722, customers: [5119921] },
  5757170: { sbi: 200283778, customers: [5757190] },
  5760196: { sbi: 200295259, customers: [5619509] },
  5760664: { sbi: 200296911, customers: [5682960] },
  5762094: { sbi: 200301861, customers: [5160786] },
  5769283: { sbi: 200329191, customers: [5080733] },
  5773710: { sbi: 200347592, customers: [5307155] },
  5778028: { sbi: 200363467, customers: [5296667] },
  5781979: { sbi: 200378431, customers: [5269870] },
  5784194: { sbi: 200387396, customers: [5287146] },
  5797601: { sbi: 200439296, customers: [5129856] },
  5798336: { sbi: 200442100, customers: [5167563] },
  5803623: { sbi: 200461444, customers: [5336423] },
  5812256: { sbi: 200488775, customers: [5269451] },
  5813717: { sbi: 200492760, customers: [5704714] },
  5815130: { sbi: 200497641, customers: [5190019] },
  5816120: { sbi: 200501191, customers: [5901993] },
  5817476: { sbi: 200508176, customers: [5093747] },
  5817948: { sbi: 200509985, customers: [5326666] },
  5819708: { sbi: 200516212, customers: [5347383] },
  5821231: { sbi: 200520628, customers: [5137410] },
  5824891: { sbi: 200535738, customers: [5734385] },
  5830774: { sbi: 200558930, customers: [5325528] },
  5831611: { sbi: 200562516, customers: [5684938] },
  5840812: { sbi: 200593524, customers: [5323170] },
  5843027: { sbi: 200603445, customers: [5324518] },
  5848900: { sbi: 200625862, customers: [5206388] },
  5850095: { sbi: 200630530, customers: [5316592] },
  5858516: { sbi: 200666225, customers: [5191884] },
  5860232: { sbi: 200672531, customers: [5217665] },
  5866490: { sbi: 200696492, customers: [5321849] },
  5867124: { sbi: 200698713, customers: [5340168] },
  5867768: { sbi: 200701182, customers: [5197596] },
  5871497: { sbi: 200714542, customers: [5295856] },
  5877483: { sbi: 200736138, customers: [5181678] },
  5878378: { sbi: 200739610, customers: [5229863] },
  5879607: { sbi: 200744263, customers: [5045445] },
  5884110: { sbi: 200761857, customers: [5185214] },
  5886807: { sbi: 200771472, customers: [5195900] },
  5888685: { sbi: 200778446, customers: [5181489] },
  5891514: { sbi: 200789201, customers: [5335309] },
  5467167: { sbi: 106430700, customers: [5069674] },
  80000001: { sbi: 8000000001, customers: [8000001], cphs: [] } // org with no CPH
}
