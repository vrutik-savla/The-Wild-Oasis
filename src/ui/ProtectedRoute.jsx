import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);

  display: flex;
  align-items: center;
  justify-content: center;
`;

// 390. Authorization: Protecting Routes
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) Load the authenticated use
  const { isLoading, isAuthenticated } = useUser();

  // 2) If their is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading]
  );

  // 3) While loading, show the loading Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4) If there IS authenticated user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
