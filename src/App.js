import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import Loading from "./ui/components/Loading/Loading";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";

import * as styles from "../styles/App.module.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const [postCode, setPostCode] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const[loading,setLoading] = React.useState(false);
  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */
  const handlePostCodeChange = (e) => setPostCode(e.target.value);

  const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);


  const handleClearField = () =>{
    setAddresses([]);
    setLastName("");
    setFirstName("");
    setPostCode("")
    setHouseNumber("")
    setError(undefined);
    setSelectedAddress("");
  }



  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    /** TODO: Fetch addresses based on houseNumber and postCode using the local BE api
     *✅ - Example URL of API: /api/getAddresses?postcode=1345&streetnumber=350
     *✅ - Handle errors if they occur
     *✅ - Handle successful response by updating the `addresses` in the state using `setAddresses`
     *✅ - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     *✅ - Bonus: Add a loading state in the UI while fetching addresses
     */


   let data = await fetch("/api/getAddresses?postcode="+postCode+"&streetnumber="+houseNumber).then(res=>res.json());

     
     
   if(data?.status == "error"){
  
    setLoading(false);
    return setError(data?.errormessage)
  
    };



    setTimeout(()=>{

    setLoading(false);
    setAddresses(data?.details)
    setError(undefined);
  
    },500)
      


    


  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };

  return (
    <main>
      <Section>
        <h1 className={styles.centertext}>
          Create your own address book!
          <br />
          <small className={styles.centertext}>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <form className={styles.form} onSubmit={handleAddressSubmit}>
          <fieldset>
            <legend >🏠 Find an address</legend>
            <div className={styles.formRow}>
              <InputText
                name="postCode"
                onChange={handlePostCodeChange}
                placeholder="Post Code"
                value={postCode}
              />
            </div>
            <div className={styles.formRow}>
              <InputText
                name="houseNumber"
                onChange={handleHouseNumberChange}
                value={houseNumber}
                placeholder="House number"
              />
            </div>
            <Button className={styles.primary} type="submit">Find</Button>
            {loading &&<div className={styles.formLoader}><Loading/></div>}
          </fieldset>
        </form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address?.id}
                key={address?.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress != "" && (
          <form className={styles.form} onSubmit={handlePersonSubmit}>
            <fieldset>
              <legend >✏️ Add personal info to address</legend>
              <div className={styles.formRow}>
                <InputText
                  name="firstName"
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
              </div>
              <div className={styles.formRow}>
                <InputText
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
              </div>
              <Button className={styles.primary} type="submit">Add to addressbook</Button>
            </fieldset>
          </form>
        )}

     

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button className={styles.secondary} onClick={handleClearField} >Clear all fields</Button>
        
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
