// components/FixturesTab.jsx
import React, { useState, useEffect } from "react";
import { Shuffle, X, Check, Trash2 } from "lucide-react";
import { adminAPI } from "./adminApi";

const FixturesTab = ({ authToken, showNotification }) => {
  const [pendingFixtures, setPendingFixtures] = useState([]);
  const [approvedFixtures, setApprovedFixtures] = useState([]);

  useEffect(() => {
    loadFixtures();
  }, []);

  const loadFixtures = async () => {
    try {
      const [pending, approved] = await Promise.all([
        adminAPI.getPendingFixtures(authToken),
        adminAPI.getApprovedFixtures(),
      ]);
      setPendingFixtures(pending);
      setApprovedFixtures(approved);
    } catch (error) {
      showNotification("❌ Failed to load fixtures", "error");
    }
  };

  const generateFixtures = async () => {
    try {
      await adminAPI.generateFixtures(authToken);
      showNotification("🎲 Fixtures generated successfully!", "success");
      loadFixtures();
    } catch (error) {
      showNotification(
        "❌ Failed to generate fixtures: " + error.message,
        "error"
      );
    }
  };

  const approveFixture = async (fixtureId) => {
    try {
      await adminAPI.approveFixture(authToken, fixtureId);
      showNotification("✅ Fixtures approved and published!", "success");
      loadFixtures();
    } catch (error) {
      showNotification("❌ Failed to approve fixtures", "error");
    }
  };

  const deleteFixture = async (fixtureId) => {
    if (window.confirm("Are you sure you want to delete this fixture?")) {
      try {
        await adminAPI.deleteFixture(authToken, fixtureId);
        showNotification("🗑️ Fixture deleted successfully!", "success");
        loadFixtures();
      } catch (error) {
        showNotification("❌ Failed to delete fixture", "error");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">⚔️ FIXTURE MANAGEMENT</h2>
        <button
          onClick={generateFixtures}
          className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300"
        >
          <Shuffle className="w-5 h-5 inline mr-2" />
          🎲 GENERATE NEW DRAW
        </button>
      </div>

      {/* Pending Fixtures */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">
          ⏳ PENDING APPROVAL
        </h3>
        <div className="space-y-4">
          {pendingFixtures.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl text-center border border-yellow-500/30">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold mb-2">No Pending Fixtures</h3>
              <p className="text-gray-400">
                Generate new fixtures to get started.
              </p>
            </div>
          ) : (
            pendingFixtures.map((fixture) => (
              <div
                key={fixture._id}
                className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-yellow-500/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-yellow-400">
                    {fixture.round}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => approveFixture(fixture._id)}
                      className="bg-green-600 px-4 py-2 rounded-lg font-bold hover:bg-green-500 transition-colors duration-300"
                    >
                      <Check className="w-4 h-4 inline mr-1" />
                      APPROVE
                    </button>
                    <button
                      onClick={() => deleteFixture(fixture._id)}
                      className="bg-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4 inline mr-1" />
                      DELETE
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {fixture.matches.map((match, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-cyan-500/30"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-lg font-bold text-cyan-400">
                          {match.team1.teamName}
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">
                          VS
                        </div>
                        <div className="text-lg font-bold text-cyan-400">
                          {match.team2.teamName}
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-400">
                        📅 {new Date(match.date).toLocaleDateString()} | ⏰{" "}
                        {match.time} | 📍 {match.venue}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  Generated: {new Date(fixture.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Approved Fixtures */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-green-400">
          ✅ APPROVED FIXTURES
        </h3>
        <div className="space-y-4">
          {approvedFixtures.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl text-center border border-green-500/30">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2">No Approved Fixtures</h3>
              <p className="text-gray-400">
                Approve pending fixtures to display them here.
              </p>
            </div>
          ) : (
            approvedFixtures.map((fixture) => (
              <div
                key={fixture._id}
                className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-green-500/30"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {fixture.round} ✅
                </h3>
                <div className="grid gap-4">
                  {fixture.matches.map((match, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold">
                          {match.team1.teamName}
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">
                          VS
                        </div>
                        <div className="text-lg font-bold">
                          {match.team2.teamName}
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-400 mt-2">
                        📅 {new Date(match.date).toLocaleDateString()} | ⏰{" "}
                        {match.time} | 📍 {match.venue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// components/TeamModal.jsx

const TeamModal = ({ team, onClose, onUpdateStatus }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold">📋 TEAM DETAILS</h3>
          <button
            onClick={onClose}
            className="text-4xl hover:text-red-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-cyan-400">
              📋 Team Information
            </h4>
            <div className="space-y-3">
              {[
                { label: "Team Name", value: team.teamName },
                { label: "Captain Name", value: team.captainName },
                { label: "Captain CNIC", value: team.captainCNIC },
                {
                  label: "Registration Date",
                  value: new Date(team.registrationDate).toLocaleString(),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 backdrop-blur-xl p-4 rounded-lg border border-white/10"
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-lg font-bold">{item.value}</div>
                </div>
              ))}
            </div>

            <h4 className="text-2xl font-bold text-yellow-400">
              💳 Payment Details
            </h4>
            <div className="space-y-3">
              {[
                { label: "Account Title", value: team.accountTitle },
                { label: "Bank Name", value: team.bankName },
                { label: "Account Number", value: team.accountNumber },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 backdrop-blur-xl p-4 rounded-lg border border-white/10"
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-lg font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-green-400">
              📷 Payment Screenshot
            </h4>
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-lg border border-white/10">
              <img
                src={`https://futsal-backend-wod4.onrender.com/uploads/${team.paymentScreenshot}`}
                alt="Payment Screenshot"
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="hidden text-center text-gray-400 py-8">
                📷 Image not available
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => onUpdateStatus(team._id, "approved", true)}
                  className="bg-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors duration-300 flex items-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>APPROVE & VERIFY PAYMENT</span>
                </button>
                <button
                  onClick={() => onUpdateStatus(team._id, "rejected", false)}
                  className="bg-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-500 transition-colors duration-300 flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>REJECT</span>
                </button>
              </div>
            </div>

            <h4 className="text-2xl font-bold text-purple-400">📊 Status</h4>
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span>Registration Status:</span>
                <span
                  className={`font-bold ${
                    team.status === "approved"
                      ? "text-green-400"
                      : team.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {team.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Verified:</span>
                <span
                  className={`font-bold ${
                    team.paymentVerified ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {team.paymentVerified ? "✅ YES" : "❌ NO"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FixturesTab, TeamModal };
