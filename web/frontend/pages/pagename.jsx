import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState } from "react";

export default function PageName() {
    const [isLoading, setIsLoading] = useState(true);
    const fetch = useAuthenticatedFetch();
    // const [data, setData] = useState([]);
    // const handlePopulate = async () => {
    //     const {  products } = await fetch("/api/products");
    //     setData(products)
    //     // if (response.ok) {
    //         // setToastProps({ content: "Data fetched" });
    //         // console.warn( response.json() );
    //         console.warn({data})
    //     // } else {
    //     //   setToastProps({
    //     //     content: "There was an error creating products",
    //     //     error: true,
    //     //   });
    //     // }
    //   };

    const {
        data
      } = useAppQuery({
        url: "/api/products",
        reactQueryOptions: {
          onSuccess: () => {
            setIsLoading(false);
          },
        },
      });


  return (
    <Page>
      <TitleBar
        title="Index Page"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Secondary action",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
                  {data &&
                      data.products.map((item, index) => {
                          return <Card key={index} sectioned>
                              <Heading>{ item.title}</Heading>
                              <TextContainer>
                                  <p>{ item.variants[0].price }</p>
                              </TextContainer>
                          </Card>;
                      })
                  }
        </Layout.Section>
      </Layout>
    </Page>
  );
}
