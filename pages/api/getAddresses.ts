import type { NextApiRequest, NextApiResponse } from "next";

import generateMockAddresses from "../../src/utils/generateMockAddresses";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode , streetnumber },
  } = req;

  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode and street number fields mandatory!",
    });
  }

  if (postcode.length < 4) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode must be at least 4 digits!",
    });
  }

  /** TODO: Refactor the code below so there is no duplication of logic for postCode/streetNumber digit checks. */

  

  const postCode = parseInt(postcode as string);

  if (isNaN(postCode)) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode must be all digits!",
    });
  }

  const streetNumber = parseInt(streetnumber as string);

  if (isNaN(streetNumber)) {
    return res.status(400).send({
      status: "error",
      errormessage: "Street number must be all digits!",
    });

  }
  
  


/** 
Add a filter on array, if we find duplicates of postcodes or streetnumbers then it will filter out the duplicates!
*/


  var re = /[a-zA-Z]+|[0-9]+/g;
  var PostCodes = postcode.toString().match(re)?.join(" ");
 

  const mockAddresses = generateMockAddresses(
    PostCodes as string,
    streetnumber as string
  )?.filter((item,pos,self)=>{
    return pos === self.findIndex((e)=>e.postcode == item.postcode && e.street == item.street);
  });
  



  if (mockAddresses) {
    return res.status(200).json({
      status: "ok",
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: "error",
    errormessage: "No results found!",
  });
}
