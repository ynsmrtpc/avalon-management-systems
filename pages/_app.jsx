import "@/styles/globals.css";
import store from "../store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const getLayout = (Component) => {
    return Component;
  };

  const Layout = getLayout(Component);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
