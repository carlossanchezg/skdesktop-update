import React, { useState, useContext } from "react";

import RealmContext from "../../contexts/RealmContext";
import { getRealm, getRealmApp, isLoggedIn } from "../../services/realm";

import SettingsOptionsContext from "../../contexts/SettingsOptionsContext";

import Container from "../../components/Container";
import SettingsContainer from "../../components/SettingsContainer";
import Dropdown from "../../components/DropDown";
import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./Settings.module.css";

import { hourOptions } from "../../utils";

import { useTranslation } from "react-i18next";

const { shell } = require("electron"); // Import at top of page..
const Settings = () => {
  const [t, i18n] = useTranslation("global");

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
  const [soundOnDoneTask, setSoundOnDoneTask] = useState(true);
  const [soundOnDeleteTask, setSoundOnDeleteTask] = useState(true);
  const [animationOnDoneTask, setAnimationOnDoneTask] = useState(true);

  const [selectedHour, setSelectedHour] = useState(0);

  console.log("exired cintext", deleteExpired);
  console.log("exired solo", deleteExpiredTasks);

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
    {
      label: "Portuges",
      value: "po",
    },
    {
      label: "Franses",
      value: "fr",
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
                {/* <span
                  class="material-icons-round"
                  style={{
                    fontSize: 33,
                    color: "white",
                  }}
                >
                  school
                </span> */}
                <text className={styles.premium_button_text}>Premium</text>
              </div>
            }
            customClassName={styles.premium_button}
          />
        </div>
        <div>
          <h2>Account</h2>
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
                {/* <span
                  class="material-icons-round"
                  style={{
                    fontSize: 33,
                    color: "white",
                  }}
                >
                  school
                </span> */}
                <text className={styles.edit_account_button_text}>
                  Edit Account
                </text>
              </div>
            }
            customClassName={styles.edit_account_button}
          />
          <div>
            <text style={{
              fontSize: 9,
            }}>Login in browser to edit your account.</text>
          </div>
          {/* <div style={{
            
          }}>
            <Input
              inputValue={userName}
              examplePlaceHolder="Ex; Math"
              inputValueFunction={(e) => {}}
              inputType="email"
            />
            <Input
              inputValue={email}
              examplePlaceHolder="Ex; Math"
              inputValueFunction={(e) => {}}
              inputType="email"
            />
          </div> */}
          <h3
            onClick={handleOut}
            style={{ color: "lightblue", cursor: "pointer" }}
          >
            Logout
          </h3>
        </div>
        <div>
          <h2>{t("settings.languaje")}</h2>
          <SettingsContainer
            settingTitle="Change Languaje"
            settingsDescription="Selecciona tu idioma preferido"
            settingSwitch={false}
            noSwitchRightContent={
              <Dropdown
                customDisable={false}
                dropOptions={languageOptions}
                dropValue={(value) => i18n.changeLanguage(value.value)}
                dropPlace="Languaje"
              />
            }
          />
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
          {/* <SettingsContainer
            settingTitle="Sound on done Task"
            settingsDescription="Reproducir sonido al terminar una tarea"
            settingSwitch={true}
            switchValue={soundOnDoneTask}
            swithOnChange={(xwey, e) => setSoundOnDoneTask(!soundOnDoneTask)}
          />
          <SettingsContainer
            settingTitle="Done Task Sound"
            settingsDescription="Escoge el sonido que quieres escuchar el terminar una tarea"
            settingSwitch={false}
            noSwitchRightContent={
              <Dropdown
                customDisable={soundOnDoneTask ? false : true}
                dropOptions={hourOptions}
                dropValue={(value) => setSelectedHour(value.value)}
                dropPlace="Sound"
              />
            }
          />
          <SettingsContainer
            settingTitle="Sound on Delete Task"
            settingsDescription="Reproducir sonido al eliminar una tarea"
            settingSwitch={true}
            switchValue={soundOnDeleteTask}
            swithOnChange={(xwey, e) =>
              setSoundOnDeleteTask(!soundOnDeleteTask)
            }
          />
          <SettingsContainer
            settingTitle="Animation on done Task"
            settingsDescription="Reproducir Animacion al terminar una tarea"
            settingSwitch={true}
            switchValue={animationOnDoneTask}
            swithOnChange={(xwey, e) =>
              setAnimationOnDoneTask(!animationOnDoneTask)
            }
          /> */}
        </div>
      </div>
    </Container>
  );
};

export default Settings;
