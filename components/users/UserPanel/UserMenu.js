import React, { useState, useContext } from 'react';
import { HStack, Heading, Center, Pressable, PresenceTransition, Text, View } from 'native-base';

import { LoggedUserContext } from '../../../utils/UserManager';
import { ViewManagerContext } from '../../mainView/ViewManagerContextProvider';
import ProfilePicture from './ProfilePicture';
import GenericIconButton from '../UserForms/FormComponents/GenericIconButton';
import { ProjectContext } from '../../../utils/ProjectManager';

import Logo from '../../logo/Logo';

const UserMenu = (props) => {
    const [menuOpen, useMenuOpen] = useState(true);

    const ProjectFunctions = useContext(ProjectContext);
    const ViewFunctions = useContext(ViewManagerContext);
    const LoggedUserData = useContext(LoggedUserContext).userData;

    function handleMenuOpening() {
        useMenuOpen(!menuOpen);
    }

    async function goToProjectSelector() {
        await ProjectFunctions.setCurrentProjectDataFunc(null);
        await ViewFunctions.changeCurrentViewTo("ProjectSelector");
    }

    return (

        <View position={"absolute"} top={0} left={0} w={"100%"} zIndex={1}>
            <Logo color={"white"} size={"small"} />
            <HStack w={"100%"}>
                <Center w={"20%"} ml="2%">
                    <Pressable onPress={handleMenuOpening}>
                        <ProfilePicture source={LoggedUserData.image} makeItBigger={menuOpen} />
                    </Pressable>
                </Center>
                <HStack w="80%">
                    <Center w={"60%"}>
                        <PresenceTransition w="100%" visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                            <Heading size="md" >{LoggedUserData.username} </Heading>
                            <Text fontSize={"md"} underlined>{LoggedUserData.email}</Text>
                        </PresenceTransition>
                    </Center >
                    <HStack w={"40%"} alignItems="center">
                        <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                            <GenericIconButton
                                onPress={goToProjectSelector}
                                iconName={"view-list"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
                                colorScheme={"primary"} key={"ProjectSelector"} title={"ProjectSelector"} />
                        </PresenceTransition>
                        <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                            <GenericIconButton
                                onPress={ViewFunctions.changeCurrentViewTo.bind(this, "EditUserForm")}
                                iconName={"build"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
                                colorScheme={"indigo"} key={"EditProfile"} title={"EditProfile"} />
                        </PresenceTransition>
                        <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                            <GenericIconButton
                                onPress={ViewFunctions.changeCurrentViewTo.bind(this, "LogoutView")}
                                iconName={"logout"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
                                colorScheme={"amber"} key={"Logout"} title={"Logout"} />
                        </PresenceTransition>
                    </HStack >
                </HStack>

            </HStack >
        </View >

    )
}

export default UserMenu;



//     return (

//         <View position={"absolute"} top={0} left={0} w={"100%"} zIndex={1}>
//             <HStack w={"100%"}>
//                 <Center w={"20%"} ml="2%">
//                     <Pressable onPress={handleMenuOpening}>
//                         <ProfilePicture source={LoggedUserData.image} makeItBigger={menuOpen} />
//                     </Pressable>
//                 </Center>
//                 <HStack w="80%">
//                     <Center w={"60%"}>
//                         <PresenceTransition w="100%" visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
//                             <Heading size="md" >{LoggedUserData.username} </Heading>
//                             <Text fontSize={"md"} underlined>{LoggedUserData.email}</Text>
//                         </PresenceTransition>
//                     </Center >
//                     <HStack w={"40%"} alignItems="center">
//                         <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
//                             <GenericIconButton
//                                 onPress={goToProjectSelector}
//                                 iconName={"view-list"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
//                                 colorScheme={"primary"} key={"ProjectSelector"} title={"ProjectSelector"} />
//                         </PresenceTransition>
//                         <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
//                             <GenericIconButton
//                                 onPress={ViewFunctions.changeCurrentViewTo.bind(this, "EditUserForm")}
//                                 iconName={"build"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
//                                 colorScheme={"indigo"} key={"EditProfile"} title={"EditProfile"} />
//                         </PresenceTransition>
//                         <PresenceTransition visible={menuOpen} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
//                             <GenericIconButton
//                                 onPress={ViewFunctions.changeCurrentViewTo.bind(this, "LogoutView")}
//                                 iconName={"logout"} iconSize={"6"} iconButtonSize={"sm"} centerSize={"sm"}
//                                 colorScheme={"amber"} key={"Logout"} title={"Logout"} />
//                         </PresenceTransition>
//                     </HStack >
//                 </HStack>

//             </HStack >
//         </View >

//     )
// }

// export default UserMenu;