// NOTE: reference data is pretty static and limited,
// so no need for the same level of fakery as the other routes,
// instead we can just return the same hard coded response as upstream.

export const referenceData = [
  {
    method: 'GET',
    path: '/reference/legalstatus',
    handler: async (_, h) => {
      return h.response({
        _data: [
          {
            id: 102101,
            type: 'Charitable Incorporated Organisation (CIO)'
          },
          {
            id: 102102,
            type: 'Community Interest Company (CIC)'
          },
          {
            id: 102103,
            type: 'Government (Central)'
          },
          {
            id: 102104,
            type: 'Government (Local)'
          },
          {
            id: 102105,
            type: 'Limited Liability Partnership (LLP)'
          },
          {
            id: 102106,
            type: 'Limited Partnership (LP)'
          },
          {
            id: 102107,
            type: 'Non-UK Company'
          },
          {
            id: 102108,
            type: 'Partnership'
          },
          {
            id: 102109,
            type: 'Private Limited Company (Ltd)'
          },
          {
            id: 102110,
            type: 'Public Limited Company (PLC)'
          },
          {
            id: 102111,
            type: 'Sole Proprietorship'
          },
          {
            id: 102112,
            type: 'The Crown'
          },
          {
            id: 102113,
            type: 'Charitable Trust'
          },
          {
            id: 102114,
            type: 'Unlimited Company (Ultd)'
          }
        ]
      })
    }
  }
]
