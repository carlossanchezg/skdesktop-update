import React, { useEffect, useState, useContext } from "react";

import {ObjectId} from "bson";

import RealmContext from "../../contexts/RealmContext";

import { isLoggedIn } from "../../services/realm";

import Button from "../Button";

import AddItemContainer from "../AddItemContainer";

import CustomModal from "../Modal";
import TitleAndIconClose from "../Modal/titleAndIconClose";
import TextAndComponentContainer from "../Modal/textAndComponentContainer";
import Input from "../Input";
import SubmitBottomButtons from "../Modal/submitBottomButtons";
import SwitchSelector from "../SwitchSelector";

import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from "../../styles";

import { icons } from "../../utils";

Modal.setAppElement("#root");
const TasksFilters = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);

  const [userFilters, setUserFilters] = useState([]);

  const [filterName, setFilterName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState('baseball-ball');

  const handleGetUserFilters = async () => {
    if (realm && isLoggedIn(realmApp)) {
      const filters = realm.objects("Filter");

      setUserFilters(filters);

      console.log(filters.map((item) => item));
    }
  };

  const handleCreateFilterTask = async (e, name, icon) => {
    e.preventDefault();

    const data = {
      _id: ObjectId(),
      name: name,
      icon: icon,
      userID: realmApp.currentUser ? realmApp.currentUser.id : "unknownUser",
    };

    try {
      realm.write(() => {
        realm.create("Filter", data);
      });
    } catch (error) {
      console.log("ERR", error);
    }

    setUserFilters(realm.objects("Filter"));
    setOpenModal(false);
  };

  const handleDeleteUserFilter = async (e, filterId) => {
    e.preventDefault();

    try {
      realm.write(() => {
        const foundFilter = realm.objectForPrimaryKey("Filter", filterId);

        realm.delete(foundFilter);
      });
    } catch (error) {
      console.log("ERR", error);
    }

    setUserFilters(realm.objects("Filter"));
  };

  useEffect(() => {
    handleGetUserFilters();
  }, []);

  return (
    <div>
      <div
        style={{
          // backgroundColor: 'orange',
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AddItemContainer
          itemAreaText="Filters"
          customIcon="filter"
          onPressFunction={() => {
            setOpenModal(true);
            setFilterName("");
          }}
          buttonText="New Filter"
        />

        <CustomModal
          open={openModal}
          customHeight="33%"
          customTop="28%"
          overlayClick={(value) => setOpenModal(value)}
          content={
            <div
              style={{
                // backgroundColor: 'steelblue',
                height: "100%",
              }}
            >
              <TitleAndIconClose
                modalTitle="Create New Filter"
                closeModal={(value) => setOpenModal(value)}
              />
              <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                <TextAndComponentContainer>
                  <text>Name</text>
                  <Input
                    inputValue={filterName}
                    examplePlaceHolder="Workout"
                    inputValueFunction={(e) => setFilterName(e.target.value)}
                    inputType="email"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <text>Icon</text>
                  <text style={{ fontSize: 8 }}>optional</text>
                </div>
                <SwitchSelector
                  scroll={true}
                  content={icons.map((item) =>
                    item.iconCode === selectedIcon ? (
                      <div
                        onClick={() => setSelectedIcon(item.iconCode)}
                        style={{
                          backgroundColor: 'black',
                          marginLeft: '2px',
                          marginRight: '2px',
                          paddingLeft: '15px',
                          paddingRight: '15px',
                          paddingTop: '5px',
                          paddingBottom: '5px',
                          borderRadius: '50px',
                        }}
                      >
                        <FontAwesomeIcon
                          size="sm"
                          icon={item.iconCode}
                          color="white"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setSelectedIcon(item.iconCode)}
                        style={{
                          backgroundColor: 'transparent',
                          marginLeft: '2px',
                          marginRight: '2px',
                          paddingLeft: '15px',
                          paddingRight: '15px',
                          paddingTop: '5px',
                          paddingBottom: '5px',
                          borderRadius: '50px',
                        }}
                      >
                        <FontAwesomeIcon size="sm" icon={item.iconCode} />
                      </div>
                    )
                  )}
                />
              </TextAndComponentContainer>

                <SubmitBottomButtons
                  cancelFunction={() => setOpenModal(false)}
                  submitFunction={(e) => handleCreateFilterTask(e, filterName, selectedIcon)}
                  submitButtonText="Crear"
                  submitBg="lightblue"
                />
              </div>
            </div>
          }
        />
      </div>
      <div
        style={{
          // backgroundColor: 'lightsalmon',
          overflowY: "scroll",
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          height: 191,
        }}
      >
        {userFilters.map((item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              // backgroundColor: 'linen',
              marginBottom: 15,
              borderTopStyle: "solid",
              borderTopColor: Colors.SecondaryBackground,
              borderTopWidth: 1,
              borderRight: "none",
              borderBottom: "none",
              borderLeft: "none",
            }}
          >
            <div>
              <FontAwesomeIcon color="black" size="sm" icon={item.icon} />
              <text style={{ fontSize: 15, marginLeft: 6 }}>{item.name}</text>
            </div>
            <Button
              onPress={(e) => handleDeleteUserFilter(e, item._id)}
              content={<FontAwesomeIcon color="red" icon="trash-alt" />}
              styleBtn={{ backgroundColor: "transparent" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksFilters;
