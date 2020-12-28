import React, { useState, useEffect } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import { RetweetOutlined } from "@ant-design/icons";
import { Row, Col, Button, Input, Image, Alert, Layout } from "antd";
import chrome from "../../../chrome_instructions.png";
import android from "../../../android_instructions.png";
import "react-html5-camera-photo/build/css/index.css";
import "antd/dist/antd.css";
import {
  getEntries,
  submitEntry,
  updateEntry,
} from "../../../Utils/redux/actions/morale_api.js";
export default function Content(props) {
  const [cameraMode, setCameraMode] = useState(FACING_MODES.USER);
  const [inputText, setInputText] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [error, setError] = useState(false);
  const [showInstructions, setShowInstructions] = useState([]);
  const [currentEntries, setCurrentEntries] = useState(false);
  const [uploading,setUploading] = useState(false)
  function handleTakePhoto(dataUri) {
    setDataInput(dataUri);
  }
  function handleUpload(arg) {
    if (arg.status === 201) {
      setUploading(false)
    } else {
      setError(2);
    }
  }
  function loadSubmissions(response) {
    setCurrentEntries(response.submissions);
    response.submissions.map((submission) => {
      if (submission.user_id === props.accountInfo.account.accountIdentifier) {
        setInputText(submission.comment);
        setDataInput(submission.url);
      }
      return [];
    });
  }
  useEffect(() => getEntries(loadSubmissions), []);
  return currentEntries === false ? (
    <></>
  ) : (
    <Layout.Content>
      {dataInput === "" ? (
        <Row>
          <Col>
            {error === true ? (
              <>
                <Alert
                  message="We had an issue opening your camera, make sure you allow access to the camera for this site."
                  type="error"
                />
                {!showInstructions.includes("chrome") ? (
                  <Button
                    onClick={() =>
                      setShowInstructions([...showInstructions, "chrome"])
                    }
                  >
                    Help on Computer
                  </Button>
                ) : (
                  <Image src={chrome} />
                )}
                {!showInstructions.includes("android") ? (
                  <Button
                    onClick={() =>
                      setShowInstructions([...showInstructions, "android"])
                    }
                  >
                    Help on Phone
                  </Button>
                ) : (
                  <Image src={android} />
                )}
              </>
            ) : error === 2 ? (
              <>
                <Alert
                  message="An unknown error occured.  Refresh the page and try again.  If that doesn't solve this error please let Joel know 503-828-7180."
                  type="error"
                />
              </>
            ) : (
              <Camera
                imageType={IMAGE_TYPES.JPG}
                imageCompression={1}
                isDisplayStartCameraError={false}
                isImageMirror={false}
                onTakePhoto={(dataUri) => {
                  handleTakePhoto(dataUri);
                }}
                onCameraError={(error) => {
                  setError(true);
                }}
                idealFacingMode={cameraMode}
              />
            )}
          </Col>
          {error === false && (
            <div style={{ position: "absolute", top: "75px", left: "300px" }}>
              <RetweetOutlined
                style={{ fontSize: "72px" }}
                rotate={90}
                onClick={() =>
                  setCameraMode(
                    cameraMode === FACING_MODES.USER
                      ? FACING_MODES.ENVIRONMENT
                      : FACING_MODES.USER
                  )
                }
              />
            </div>
          )}
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              Increase your chances of winning with a funny title:
              <br />
              <Input
                style={{ width: "50%" }}
                value={inputText}
                onChange={(value) => setInputText(value.target.value)}
              />
              <Image src={dataInput} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button size="large" danger onClick={() => setDataInput("")}>
                Retake
              </Button>
              <Button
                size="large"
                type="primary"
                loading={uploading}
                onClick={() =>
                  currentEntries.find(
                    (entry) =>
                      entry.user_id ===
                      props.accountInfo.account.accountIdentifier
                  )
                    ? updateEntry(
                        currentEntries.find(
                          (entry) =>
                            entry.user_id ===
                            props.accountInfo.account.accountIdentifier
                        ).id,
                        dataInput,
                        inputText,
                        handleUpload
                      )
                    : setUploading(true) || submitEntry(dataInput, inputText, handleUpload)
                }
              >
                Submit
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Layout.Content>
  );
}
