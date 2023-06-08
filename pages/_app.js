import '@/styles/globals.css'
import HomeLayout from '@/layouts/HomeLayout.js'

export default function App({ Component, pageProps }) {
  const getLayout = (Component) =>  {
    if(Component.HomeLayout){
      return HomeLayout;
    }
    return HomeLayout;
  };
  const Layout = getLayout(Component);
return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
)
}
