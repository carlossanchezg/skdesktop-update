import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";

import Realm from "realm";

import TasksScreen from "./Screens/Tasks";

import StudyScreen from "./Screens/Study";
import FlashCardsCourses from "./Screens/Study/FlashCards";
import FlashCards from "./Screens/Study/FlashCards/FlashCards";
import Pomodoros from "./Screens/Study/Pomodoros";
import Settings from "./Screens/Settings";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faTimes,
  faAnchor,
  faAmbulance,
  faAngleDoubleDown,
  faAllergies,
  faBabyCarriage,
  faAtom,
  faBan,
  faRunning,
  faUtensils,
  faTrashAlt,
  faCheckCircle,
  faFilter,
  faBell,
  faRedo,
  faLongArrowAltRight,
  faSquareRootAlt,
  faDivide,
  faLanguage,
  faFlask,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faMinusCircle,
  faClock,
  faCog,
  faCodeBranch,
  faPlus,
  faCheck,
  faTrash,
  faStopwatch,
  faBrain,
  faBaseballBall,
  faBath,
  faBed,
  faGlassCheers,
  faBiking,
  faBible,
  faBirthdayCake,
  faBone,
  faBookReader,
  faBroom,
  faBus,
  faCamera,
  faCandyCane,
  faCar,
  faCartPlus,
  faChessKing,
  faChild,
  faCode,
  faCogs,
  faComments,
  faDice,
  faDollarSign,
  faEdit,
  faExclamationTriangle,
  faEnvelope,
  faEye,
  faFemale,
  faFileSignature,
  faChessKnight,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getRealmApp, getRealm } from "./services/realm";
import RealmContext from "./contexts/RealmContext";
library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faTimes,
  faAnchor,
  faAmbulance,
  faAngleDoubleDown,
  faAllergies,
  faBabyCarriage,
  faAtom,
  faBan,
  faRunning,
  faUtensils,
  faTrashAlt,
  faCheckCircle,
  faFilter,
  faBell,
  faRedo,
  faLongArrowAltRight,
  faSquareRootAlt,
  faDivide,
  faLanguage,
  faFlask,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faMinusCircle,
  faClock,
  faCog,
  faCodeBranch,
  faPlus,
  faCheck,
  faTrash,
  faStopwatch,
  faBrain,
  faBaseballBall,
  faBath,
  faBed,
  faGlassCheers,
  faBiking,
  faBible,
  faBirthdayCake,
  faBone,
  faBookReader,
  faBroom,
  faBus,
  faCamera,
  faCandyCane,
  faCar,
  faCartPlus,
  faChessKnight,
  faChild,
  faCode,
  faCogs,
  faComments,
  faDice,
  faDollarSign,
  faEdit,
  faExclamationTriangle,
  faEnvelope,
  faEye,
  faFemale,
  faFileSignature,
  faPlusCircle,
);

const {ipcRenderer} = require('electron');

function App() {
  const [realmApp, setRealmApp] = useState(getRealmApp());
  const [realm, setRealm] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateState, setUpdateState] = useState('');
  

  useEffect(() => {
    const loadRealm = async () => {
      try {
        setRealm(await getRealm());
      } catch (error) {
        console.log('ERR: ', error.message);
      }
    }
    loadRealm();

    ipcRenderer.on('update-message', (_, data) => {
      if (data){
        const {state, message} = data;
        if (state === 'available'){
          setIsUpdating(true);
        }
        setUpdateState(state === 'update-downloaded' ? 'Restart app to install update' : message);
      }
    })

  }, []);
  
  return (
    <RealmContext.Provider value={{realmApp, setRealmApp, realm, setRealm}}>
      {isUpdating ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
          <h1>Updating</h1>
          <div>
            <h3>{updateState}</h3>
          </div>
        </div>
      ) : (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<TasksScreen/>} />
              <Route path="/study" element={<StudyScreen/>} />
              <Route path="/flash-cards" element={<FlashCardsCourses/>} />
              <Route
                path="/flash-cards-course/:courseName/:courseId"
                element={<FlashCards/>}
              />
              <Route path="/pomodoros" element={<Pomodoros/>} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </div>
        </Router>
      )}
    </RealmContext.Provider>
  );
}

export default App;
