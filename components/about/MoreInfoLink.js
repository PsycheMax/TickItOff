import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../utils/ThemeManager';
import Logo from '../logo/Logo';

export default function MoreInfoLink(props) {

    const theme = useContext(ThemeContext);

    const navigation = useNavigation();

    const styles = StyleSheet.create({

        footerContainer: {

            marginTop: 5

        },
        centered: {
            justifyContent: "center",
            alignItems: "center"
        },
        moreInfoContainer: {

        },
        moreInfoText: {
            color: theme.colors.primary[700],
            marginBottom: 10,
            alignSelf: "center",
            fontSize: 16
        }
    })

    function handleClick() {
        navigation.navigate('About');
    }

    return (
        <View style={[styles.footerContainer, styles.centered]}>
            <TouchableOpacity onPress={handleClick}>
                <View style={styles.moreInfoContainer}>
                    {props.showLogo ?
                        <View style={styles.centered}>
                            <Logo size="extraSmall" color="color" />
                        </View> : <></>}
                    <View>
                        <Text style={styles.moreInfoText}>Tick It Off! - © 2022, MaxPace.net </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}