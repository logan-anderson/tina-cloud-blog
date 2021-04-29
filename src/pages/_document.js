import Document, { Html, Head, Main, NextScript } from 'next/document';

const description =
  'A simple blog made with nextjs that uses Tina Cloud for editing.';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={description} />
          <meta property="og:title" content="Tina Cloud Blog" />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content="https://tina.io/img/tina-twitter-share.png"
          />
          <meta
            property="og:url"
            content="https://tina-cloud-blog.vercel.app"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
