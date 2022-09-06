import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createShopifyApp } from '../utils/shopifyApp';
import { Card, DisplayText, Layout, Page, Link } from '@shopify/polaris';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;

		const { host } = router.query;
		createShopifyApp(host, true);
	}, [router.isReady]);

	return (
		<>
			<Head>
				<title>Hello World!</title>
			</Head>

			<Page title={'Salut Laurentiu'} narrowWidth={true}>
				<Layout>
					<Layout.Section>
						<Card>
							<Card.Section>
								<DisplayText size={'medium'}>Embedded App with Polaris</DisplayText>
							</Card.Section>
							<Card.Section>
								<p>
									Start building your app using{' '}
									<Link url={'https://www.smoothcode.io'}>SmoothCode</Link>
								</p>
							</Card.Section>
						</Card>
					</Layout.Section>
				</Layout>
			</Page>
		</>
	);
}
