import React, { useState, useContext } from "react";

import RealmContext from "../../contexts/RealmContext";
import { getRealm, getRealmApp, isLoggedIn } from "../../services/realm";

import SettingsOptionsContext from "../../contexts/SettingsOptionsContext";

import Container from "../../components/Container";
import SettingsContainer from "../../components/SettingsContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./Settings.module.css";

import { Link } from "react-router-dom";

const { shell } = require("electron"); // Import at top of page..
const Settings = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [userName, setUserName] = useState(
    isLoggedIn(realmApp)
      ? realmApp.currentUser.customData
        ? realmApp.currentUser.customData.name
        : ""
      : ""
  );
  const [email, setEmail] = useState(
    isLoggedIn(realmApp)
      ? realmApp.currentUser.customData
        ? realmApp.currentUser.customData.email
        : ""
      : ""
  );

  const { deleteExpired, setDeleteExpired } = useContext(
    SettingsOptionsContext
  );

  const [deleteExpiredTasks, setDeleteExpiredTasks] = useState(true);

  const [authLoading, setAuthLoading] = useState(false);

  const handleOut = () => {
    if (isLoggedIn(realmApp)) {
      setAuthLoading(true);
      realmApp.currentUser
        .logOut()
        .then(async (_) => {
          if (!isLoggedIn(realmApp)) {
            setRealmApp(getRealmApp());
            setRealm(await getRealm());
            // navigation.navigate('Settings');
          }
          setAuthLoading(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const languageOptions = [
    {
      label: "Español",
      value: "es",
    },
    {
      label: "Ingles",
      value: "en",
    },
  ];

  return (
    <Container navTitle="Settings" padding={false}>
      <div
        style={{
          // backgroundColor: 'lightgrey',
          padding: 20,
          overflow: "scroll",
          height: 605,
        }}
      >
        {realmApp.currentUser?.customData.isPremium ? null : (
          <div>
            <h2>Skool Premium</h2>
            <Button
              onPress={() => shell.openExternal("http://theskool.info/premium")}
              content={
                <div
                  style={{
                    // backgroundColor: "orange",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <text className={styles.premium_button_text}>Premium</text>
                </div>
              }
              customClassName={styles.premium_button}
            />
          </div>
        )}

        <div>
          <h2>Account</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {realmApp.currentUser?.customData.isPremium ? (
              <div
                style={{
                  width: 110,
                  backgroundColor: "#D2E0F5",
                  borderRadius: 9,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginBottom: 20,
                }}
              >
                <text style={{ color: "#3780F2", fontWeight: "bold" }}>
                  Premium User
                </text>
              </div>
            ) : null}
            <text
              style={{
                color: "gray",
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              Username
            </text>
            <Input
              inputValue={userName}
              examplePlaceHolder="Username"
              inputValueFunction={(e) => {}}
              inputType="email"
              customMarginBottom={25}
              customDisable={true}
            />
            <text
              style={{
                color: "gray",
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              Email
            </text>
            <Input
              inputValue={email}
              examplePlaceHolder="Email"
              inputValueFunction={(e) => {}}
              inputType="email"
              customMarginBottom={25}
              customDisable={true}
            />
          </div>
          <Button
            onPress={() => shell.openExternal("http://theskool.info")}
            content={
              <div
                style={{
                  // backgroundColor: "orange",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <text className={styles.edit_account_button_text}>
                  Edit Account
                </text>
              </div>
            }
            customClassName={styles.edit_account_button}
          />
          <div>
            <text
              style={{
                fontSize: 9,
              }}
            >
              Login in browser to edit your account.
            </text>
          </div>
          <div
            style={{
              marginTop: 15,
            }}
          >
            <Link
              to="/"
              onClick={handleOut}
              style={{
                color: "lightblue",
                cursor: "pointer",
                textDecoration: "none",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Logout
            </Link>
          </div>
        </div>
        <div>
          <h2>Tasks</h2>
          <SettingsContainer
            settingTitle="Delete Expired Tasks"
            settingsDescription="se eliminaran todas las tareas vencidas"
            settingSwitch={true}
            switchValue={deleteExpiredTasks}
            swithOnChange={(xwey, e) =>
              setDeleteExpiredTasks(!deleteExpiredTasks)
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default Settings;
