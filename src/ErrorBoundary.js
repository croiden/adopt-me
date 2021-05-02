import React from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, redirect: false };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => {
                this.setState({ redirect: true });
            }, 5000);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <h1>
                    Something went wrong. <Link to="/"> Click here</Link> to go
                    back to the home page or wait five seconds
                </h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
