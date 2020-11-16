import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { updateUser } from "../../redux/user/user.actions";

import AvatarNameCol from "../../components/avatar-name-column.component";
import BackgroundImage from "../../components/background-screen.component";
import ButtonText from "../../components/button-text.component";
import HeaderTileWithBackBtn from "../../components/header-title-back-arrow.component";
import KeyboardAvoiding from "../../components/keyboard-avoiding.component";

import styles from "./personal-info.styles";

const PersonalInfoScreen = ({ navigation, currentUser, token, updateUser }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [linkImage, setLinkImage] = useState(currentUser.imageUrl);
    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [phone, setPhone] = useState(currentUser.phone);

    const handlerUploadImage = () => {
        const image = {
            uri: linkImage,
            name: linkImage.substring(linkImage.lastIndexOf("/") + 1),
            type: "image/png"
        };
        updateUser(currentUser.userId, token, { displayName, phone, image });
        setModalVisible(true);
    };

    return (
        <BackgroundImage>
            <View style={[styles.modal, modalVisible ? { opacity: 0.85, zIndex: 10 } : null]}>
                <View style={styles.modal__content}>
                    <Text style={styles.status}>Lưu thông tin thành công</Text>
                    <Text
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate("Home");
                        }}
                        style={styles.action}
                    >
                        Đóng
                    </Text>
                </View>
            </View>
            <View>
                <HeaderTileWithBackBtn
                    textContent="Thông tin cá nhân"
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
            <View style={styles.container_info}>
                <AvatarNameCol
                    linkImage={linkImage}
                    setLinkImage={setLinkImage}
                    textContent={currentUser.displayName}
                />
                <Text style={styles.joining_day_title}>Ngày tham gia</Text>
                <Text style={styles.joining_day}>15/09/2020</Text>
            </View>
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.container_text_input}>
                    <Text style={styles.label}>Tên *</Text>
                    <TextInput
                        style={styles.text_input}
                        defaultValue={displayName}
                        onChangeText={value => setDisplayName(value)}
                    />
                </View>
                <View style={styles.container_text_input}>
                    <Text style={styles.label}>Số điện thoại *</Text>
                    <TextInput
                        style={styles.text_input}
                        defaultValue={phone}
                        onChangeText={value => setPhone(value)}
                    />
                </View>
            </KeyboardAvoiding>
            <View style={styles.container_button_save}>
                <ButtonText
                    textContent="Lưu"
                    styleText={styles.button_text}
                    styleButton={styles.button_size}
                    onPress={handlerUploadImage}
                />
                <Text style={styles.text_policy}>
                    * Các thông tin cá nhân được bảo mật theo chính sách, qui định của Nhà nước
                </Text>
            </View>
        </BackgroundImage>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, token, user) => dispatch(updateUser(userId, token, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoScreen);
