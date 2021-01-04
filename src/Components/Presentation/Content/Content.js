import React, { useState, useEffect } from "react";
import { Layout, Card, Row, Col, Rate, Spin } from "antd";
import "react-html5-camera-photo/build/css/index.css";
import "antd/dist/antd.css";
import {
  getEntries,
  getWhoIVotedFor,
  deleteVoteForSubmission,
  voteForSubmission,
} from "../../../Utils/redux/actions/morale_api.js";
export default function Content(props) {
  const [currentEntries, setCurrentEntries] = useState([]);
  const [whoIVotedFor, setWhoIVotedFor] = useState([]);
  const [loadingVote, setLoadingVote] = useState(false);
  function loadSubmissions(response) {
    setCurrentEntries(response.submissions);
    setLoadingVote(false);
  }

  function loadWhoIVotedFor(response) {
    setWhoIVotedFor(response.myVotes);
    setLoadingVote(false);
  }

  useEffect(
    () => getEntries(loadSubmissions) || getWhoIVotedFor(loadWhoIVotedFor),
    []
  );
  return (
    <Layout.Content>
      <div style={{ margin: "50px" }}>
        <Row gutter={16}>
          <Col span={24}>
            {currentEntries.map((entry) => {
              return (
                <Card
                  hoverable
                  style={{
                    maxWidth: "75vw",
                    display: "inline-block",
                    marginLeft: "35px",
                    marginTop: "35px",
                  }}
                  cover={<img alt={entry.user.username} src={entry.url} />}
                >
                  <Card.Meta
                    title={
                      <>
                        {entry.comment}
                        {loadingVote ? (
                          <Spin style={{ float: "right" }} />
                        ) : (
                          <>
                            <Rate
                              className="content_content_vote"
                              style={{ float: "right" }}
                              count={1}
                              onChange={(val) => {
                                setLoadingVote(true) || val > 0
                                  ? voteForSubmission(
                                      entry.id,
                                      loadWhoIVotedFor
                                    )
                                  : deleteVoteForSubmission(
                                      whoIVotedFor.find(
                                        (myVote) =>
                                          myVote.submission_id === entry.id
                                      ).id,
                                      loadWhoIVotedFor
                                    );
                              }}
                              value={
                                whoIVotedFor.filter(
                                  (myVote) => myVote.submission_id === entry.id
                                ).length
                              }
                              disabled={
                                (whoIVotedFor.length > 1 &&
                                  whoIVotedFor.filter(
                                    (myVote) =>
                                      myVote.submission_id === entry.id
                                  ).length !== 1) ||
                                entry.user_id ===
                                  props.accountInfo.account.accountIdentifier
                                  ? true
                                  : false
                              }
                            />
                          </>
                        )}
                      </>
                    }
                    description={entry.user.username}
                  />
                </Card>
              );
            })}
          </Col>
        </Row>
      </div>
    </Layout.Content>
  );
}
