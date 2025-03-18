import { Card, CardContent } from "~/components/ui/card";
import dynamic from "next/dynamic";

// Dynamically import ConvertKit with no SSR to avoid module format conflicts
const ConvertKitForm = dynamic(
	() => import("convertkit-react").then((mod) => mod.default),
	{
		ssr: false,
		loading: () => (
			<div className="p-4 text-center">Loading subscription form...</div>
		),
	},
);

// Main newsletter form component
export default function NewsletterForm() {
	// Inline the form configuration directly
	return (
		<Card className="max-w-xl mx-auto bg-white/50 dark:bg-gray-800/50">
			<CardContent className="pt-6">
				<div className="text-center mb-6">
					<h3 className="text-2xl font-bold mb-2">Subscribe for Updates</h3>
				</div>
				<ConvertKitForm
					formId={7804689}
					template="clare"
					newTab={true}
					className="formkit-form"
					buttonBackground="#bbb2fa"
				/>
			</CardContent>
		</Card>
	);
}
