// App.js
import React from "react";
import {
    ToastProvider,
} from "./components/Toast";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import HelpCenterPage from "./pages/HelpCenter";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import LibraryPage from "./pages/Library";
import {ProtectedRoute} from "./components/ProtectedRoute";
import DocumentEditor from "./pages/DocumentEditor";
import { DocumentPermissionsProvider } from './contexts/DocumentPermissionsContext';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from "./pages/Profile";
import CollaborationPage from "./pages/Collaboration";
import TeamPage from "./pages/Team";
import TemplatesPage from "./pages/Templates";
import SettingsPage from "./pages/Settings";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import NotificationsPage from "@/pages/Notifications";
import InvitePage from "@/pages/InvitePage";

function App() {
    useKeyboardShortcuts([
        {
            keyCombo: "ctrl+s",
            callback: () => console.log("保存成功！"),
        },
        {
            keyCombo: "shift+n",
            callback: () => console.log("新建项目！"),
        },
        {
            keyCombo: "alt+enter",
            callback: () => console.log("特殊动作触发！"),
        },
    ]);

    return (
        <AuthProvider>
            <DocumentPermissionsProvider>
                <BrowserRouter>
                    <ToastProvider swipeDirection="right">
                        <Routes>
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/help" element={<HelpCenterPage />} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/library" element={<LibraryPage />} />
                            <Route 
                                path="/editor/:docId" 
                                element={
                                    <ProtectedRoute>
                                        <DocumentEditor />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            } />
                            <Route path="/collaborate/:docId" element={
                                <ProtectedRoute>
                                    <CollaborationPage />
                                </ProtectedRoute>
                            } />
                            <Route 
                                path="/teams" 
                                element={
                                    <ProtectedRoute>
                                        <TeamPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route 
                                path="/templates" 
                                element={
                                    <ProtectedRoute>
                                        <TemplatesPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <ProtectedRoute>
                                        <SettingsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                            <Route path="/notifications" element={
                               <ProtectedRoute>
                                    <NotificationsPage />
                               </ProtectedRoute>
                            }/>
                            <Route path="/invite" element={
                                <ProtectedRoute>
                                    <InvitePage/>
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </ToastProvider>
                </BrowserRouter>
            </DocumentPermissionsProvider>
        </AuthProvider>
    );
}

export default App;
