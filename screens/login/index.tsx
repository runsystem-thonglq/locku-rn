import Button from "@/components/button";
import Input from "@/components/input";
import BaseLayout from "@/components/layouts/base";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import yup from "@/validation/base";
import FormControl from "@/components/form-control";
import { API } from "@/services/api";
import secureStorage from "@/utils/secure-store";
import { useNavigation } from "@react-navigation/native";
interface LoginFormInputs {
  email: string;
  password: string;
}
export default function Login() {
  const navigation = useNavigation();
  const loginForm = useForm<LoginFormInputs>({
    resolver: yupResolver(yup.object().shape({
      email: yup
        .string()
        .trim()
        .required()
        .max(255)
        .email()
        .label('email'),
      password: yup.string().required().label('password'),
    })
    ),
    shouldFocusError: true,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const login = async (data: LoginFormInputs) => {
    try {
      const response = await API.login(data.email, data.password);
      if (response.idToken) {
        await secureStorage.setValue(
          "USER",
          response
        );
        navigation.navigate("Home" as never);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkAuth = async () => {
    try {
      const token = await secureStorage.getValue("USER");

      if (token?.idToken) {
        navigation.navigate("Home" as never);
      }
    } catch (error) {
      console.log(2, error);
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <BaseLayout viewStyle={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "100%", alignItems: "center", gap: 20, }}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>Login</Text>

        <FormControl label="Email" name="email" control={loginForm.control}>
          <Input name="email" placeholder="Enter text" />
        </FormControl>
        <FormControl label="Password" name="password" control={loginForm.control}>
          <Input name="password" placeholder="Enter text" />
        </FormControl>
        <Button style={{ marginTop: 20 }} onPress={loginForm.handleSubmit(login)}>Login</Button>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>@ 2024 by Kin2k</Text>
      </View>
    </BaseLayout>
  );
}

