import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { forIn, isEmpty } from 'lodash';
import { redirectURL } from '../utils/shopifyApp';

export default function AppUrl() {
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;

		const query = router.query;
		if (!isEmpty(query)) {
			let appUrl = new URL(process.env.NEXT_PUBLIC_SMOOTHCODE_APP_URL);

			forIn(query, (value, key) => {
				appUrl.searchParams.append(key, value);
			});

			redirectURL(appUrl.href, query.host);
		}
	}, [router.isReady]);

	return null;
}
