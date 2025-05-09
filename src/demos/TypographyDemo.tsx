import { Typography } from "@/components/typography/Typography";

export const TypographyDemo = () => {
	return (
		<div>
			<Typography.H1>This is a Heading 1</Typography.H1>

			{/* Heading 2 Example */}
			<Typography.H2>This is a Heading 2</Typography.H2>

			{/* Heading 3 Example */}
			<Typography.H3>This is a Heading 3</Typography.H3>

			{/* Paragraph with normal text */}
			<Typography.P>This is a regular paragraph with some text.</Typography.P>

			{/* Paragraph with first letter capitalized */}
			<Typography.P isFirstLetterCapitalized>
				this is a paragraph with the first letter capitalized.
			</Typography.P>

			{/* Paragraph with "Read More" functionality */}
			<Typography.P readMore readMoreAfterWords={5}>
				This is a long paragraph that will be truncated after 5 words and will
				show a "Read More" link if the text exceeds this limit.
			</Typography.P>

			{/* Custom "Read More" text and link */}
			<Typography.P
				readMore
				readMoreText="Continue Reading"
				readMoreLink="/full-article"
				readMoreAfterWords={10}
			>
				This paragraph is long enough to trigger the "Read More" functionality
				with custom text and a custom link.
			</Typography.P>

			{/* Paragraph with additional styling */}
			<Typography.P className="text-gray-500">
				This paragraph has custom styling with gray text.
			</Typography.P>

			{/* Span Example */}
			<Typography.Span>
				This is an inline <Typography.Bold>bold</Typography.Bold> word inside a
				span.
			</Typography.Span>

			{/* Small text Example */}
			<Typography.Small>This is some smaller text.</Typography.Small>

			{/* Large text Example */}
			<Typography.Large>This is some larger text.</Typography.Large>

			{/* Bold Text Example */}
			<Typography.Bold>This text is bold.</Typography.Bold>

			{/* Code Example */}
			<Typography.Code className="language-js" inline>
				const example = "This is inline code";
			</Typography.Code>

			{/* Preformatted Code Block Example */}
			<Typography.Pre>
				<Typography.Code className="language-js" theme="dracula">
					const example = "This is a block of code";
				</Typography.Code>
			</Typography.Pre>

			{/* Blockquote Example */}
			<Typography.Blockquote>
				"This is a quote or citation."
			</Typography.Blockquote>
		</div>
	);
};
