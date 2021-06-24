import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
    // eslint-disable-next-line
  }, []);

  if (store.isLoading) return <>Loading</>;

  return (
    <>
      {store.isAuth ? (
        <>
          {store.user.email}
          <button onClick={() => store.logout()}>Logout</button>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default observer(App);
