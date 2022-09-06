import { createApp } from '@shopify/app-bridge';
import { Redirect, Toast } from '@shopify/app-bridge/actions';
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';

export const createShopifyApp = (host, forceRedirect = false) => {
	/*
        This method creates a Shopify App Instance
        If the app is non embedded, this method redirects the app to Shopify admin in an embedded mode
        Args:
            - host: App Host
            - forceRedirect: If this is true, merchant will be redirected to embedded mode if the app opens
                             in a non embedded mode (default: false)
     */
	return createApp({
		apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
		host: host,
		forceRedirect: forceRedirect,
	});
};

export const redirectURL = (url, host) => {
	/*
        This method redirects the user outside of Shopify Admin.
        This method should be used whenever a merchant needs to be redirected outside Shopify admin
        For ex:
            - Upgrading/Downgrading Billing Plan
     */
	if (isShopifyEmbedded()) {
		const app = createShopifyApp(host);
		const redirect = Redirect.create(app);

		redirect.dispatch(Redirect.Action.REMOTE, url);
	} else {
		window.location.assign(url);
	}
};

export const redirectWithin = (url, host) => {
	/*
        This method redirects the user within the Shopify Admin.
        This method should be used whenever a merchant needs to be redirected to a different page within the app
        For ex:
            - Navigating from settings page of your app to home page of your app
     */
	if (isShopifyEmbedded()) {
		const app = createShopifyApp(host);
		const redirect = Redirect.create(app);

		redirect.dispatch(Redirect.Action.APP, url);
	} else {
		window.location.assign(url);
	}
};

export const showToast = (host, text, duration = 2000, isError = false) => {
	/*
        This method displays a toast
        This method should be used whenever you need to show a toast to the merchant
        Args:
            - host: App Host
            - text: Text of the toast to show
            - duration: duration of the toast in ms (default: 2000 -> 2sec)
            - isError: if the toast should have error css or not (default: false)
     */
	const toastOptions = {
		message: text,
		duration: duration,
		isError: isError,
	};
	const app = createShopifyApp(host);
	const toast = Toast.create(app, toastOptions);
	toast.dispatch(Toast.Action.SHOW);
};
