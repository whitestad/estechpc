import {useAuthStore} from "../store/auth";
import {Container} from "@components/common/container/Container.jsx";

function MainPage() {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    return (
        <Container>

        </Container>
    );
}

export default MainPage;
