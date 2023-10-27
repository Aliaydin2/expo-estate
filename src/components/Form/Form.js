import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
//import validations from "./validations"
import validationSchema from "./Validations";

const Form = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors ,touched,isSubmitting,bag} = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordconfirm: "",
    },
    onSubmit: async (values,bag) => {
      await new Promise((r) => setTimeout(r, 1000)); //isSubmitting bu süre boyunca true döner.
      //promise den gelen response da email kontrolünde email zaten varsa alttaki koşul ile error düşülecek.
      if (values.email=="test@test.com"){
        return bag.setErrors({email:"Bu mail adresi zaten kullanılıyor."})
         //bag.setFieldError("email","Bu mail adresi zaten kullanılıyor.")  tek bir alana error verir
      }
      bag.resetForm()
      console.log(values);
      console.log(bag); //submit olduktan sonra yapılabilecekleri obje olarak döner, 
    },
    validationSchema, //=validationSchema:validationSchema
    //validationSchema:validations
  });
  return (
    <View style={styles.view}>
      {/* <Text>{JSON.stringify(errors, null, 2)}</Text>  Formik den gelen errors*/}
      {/* <Text>{JSON.stringify(touched, null, 2)}</Text>  Formik den gelen touched, 
      handleblur da yakalanıyor. bu sayede tüm uyarılar aynı anda açılmamış oluyor. sadece onblur yapılan yerde error yazdırıyoruz.*/}
      <View style={styles.input}>
        <TextInput
          onChangeText={handleChange("username")}
          onBlur={handleBlur("username")}
          value={values.username}
          placeholder="Username"
          editable={!isSubmitting}
          style={isSubmitting&&{opacity:0.3}}
        />
      </View>
      {errors.username &&  touched.username && <Text style={styles.error}>{errors.username}</Text>}
      <View style={styles.input}>
        <TextInput
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          value={values.email}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          editable={!isSubmitting}
          style={isSubmitting&&{opacity:0.3}}
        />
      </View>
      {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
      <View style={styles.input}>
        <TextInput
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          secureTextEntry
          value={values.password}
          placeholder="Password"
          editable={!isSubmitting}
          style={isSubmitting&&{opacity:0.3}}
        />
      </View>
      {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
      <View style={styles.input}>
        <TextInput
          onChangeText={handleChange("passwordconfirm")}
          onBlur={handleBlur("passwordconfirm")}
          value={values.passwordconfirm}
          placeholder="Pasword Confirm"
          secureTextEntry
          editable={!isSubmitting}
          style={isSubmitting&&{opacity:0.3}}
        />
      </View>
      {errors.passwordconfirm && touched.passwordconfirm &&(
        <Text style={styles.error}>{errors.passwordconfirm}</Text>
      )}
      <View style={styles.button}>
        <Button onPress={handleSubmit} title="Submit" disabled={isSubmitting}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "lightblue",
    padding: 20,
  },
  input: {
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 20,
    height: 30,
    borderRadius: 5,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginLeft: 20,
  },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
    backgroundColor:"white"
  },
});
export default Form;
