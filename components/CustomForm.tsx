import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useState, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";

interface FormProps {
    title: string;
    placeholder: string;
    type: string;
    onChangeText: (value: string) => void;
}

const CustomForm = ({ title, placeholder, type, onChangeText }: FormProps) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);

    return (
        <View>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback>
                    <View className='flex gap-3 p-2'>
                        <Text className='text-lg font-semibold'>{title}</Text>
                        {type !== 'phone-pad' ? (
                            <View className='bg-gray-200 p-5 rounded-lg'>
                                <TextInput 
                                    placeholder={placeholder}
                                    placeholderTextColor={'black'}
                                    keyboardType={type}
                                    onChangeText={(text) => onChangeText(text)} // Correctly passing user input
                                    secureTextEntry={type === 'password' ? true : false}
                                />
                            </View>
                        ) : (
                            <View>
                                <View className='w-full'>
                                    <PhoneInput
                                        ref={phoneInput}
                                        defaultValue={value}
                                        defaultCode="NG"
                                        layout="first"
                                        onChangeText={(text) => {
                                            setValue(text);
                                            onChangeText(text); // Correctly passing user input
                                        }}
                                        onChangeFormattedText={(text) => {
                                            setFormattedValue(text);
                                        }}
                                        withDarkTheme
                                        containerStyle={{ backgroundColor: '#e5e7eb' }}
                                        textContainerStyle={{ backgroundColor: '#e5e7eb', width: 10 }}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CustomForm;
