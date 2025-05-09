import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface PProps {
	children: React.ReactNode;
	className?: string;
	isFirstLetterCapitalized?: boolean;
	isFirstWordCapitalized?: boolean;
        bookStyle?: boolean;
	readMore?: boolean;
	readMoreText?: string;
	readMoreLink?: string;
	readMoreAfterWords?: number;
}
/**
 * Paragraph component that supports various text formatting options.
 * @param {object} props - Props for the Paragraph component.
 * @param {React.ReactNode} props.children - The content to display inside the paragraph.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {boolean} [props.isFirstLetterCapitalized=false] - If true, capitalizes the first letter of the text.
 * @param {boolean} [props.isFirstWordCapitalized=false] - If true, capitalizes the first letter of the text.
 * @param {boolean} [props.bookStyle=false] - If true, capitalizes the first letter of the text.
 * @param {boolean} [props.readMore=false] - If true, shows a "Read More" link if text is long.
 * @param {string} [props.readMoreText="Read More"] - Custom text for the "Read More" link.
 * @param {string} [props.readMoreLink="#"] - URL to navigate to when clicking "Read More".
 * @param {number} [props.readMoreAfterWords=100] - Number of words to show before truncating.
 */
export const P = ({
	children,
	className,
	isFirstLetterCapitalized = false,
	isFirstWordCapitalized = false,
        bookStyle = false,
	readMore = false,
	readMoreText = "Read More",
	readMoreLink = "#",
	readMoreAfterWords = 100,
	...props
}: PProps) => {
	const [showFull, setShowFull] = useState(false);

	const getText = (): string => {
		if (typeof children === "string") return children;
		if (typeof children === "number") return children.toString();
		if (Array.isArray(children)) return children.join("");
		if (typeof children === "object")
			return (children as any)?.toString?.() ?? "";
		return "";
	};

	const fullText = getText();
	const words = fullText.split(" ");

	let displayText = fullText;
	if (readMore && !showFull && words.length > readMoreAfterWords) {
		displayText = words.slice(0, readMoreAfterWords).join(" ") + "...";
	}

	const firstLetter = displayText[0];

	const remainingText = displayText.slice(1);
	const firstWord = displayText.split(" ")[0];

	const renderContent = () => {
		if (isFirstLetterCapitalized) {
			return (
				<div className="flex items-center">
					<p className="capitalize">{firstLetter}</p>
					<p>{remainingText}</p>
				</div>
			);
		}
                if (bookStyle) {
                        const remainingTextAfterFirstWord = displayText.slice(firstWord.length);
			return (
				<div className="flex items-end gap-1">
					<p className="capitalize text-4xl">{firstWord}</p>
					<p>{remainingTextAfterFirstWord}</p>
				</div>
			);
		}
		if (isFirstWordCapitalized) {
			const capitalizedFirstWord =
				firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
			const remainingText = displayText.slice(capitalizedFirstWord.length);
			return (
				<div className="flex items-center">
					<p className="capitalize">{capitalizedFirstWord}</p>
					<p>{remainingText}</p>
				</div>
			);
		}
		return <span>{displayText}</span>;
	};

	return (
		<p className={cn("text-base", className)} {...props}>
			{renderContent()}

			{readMore && words.length > readMoreAfterWords && !showFull && (
				<a
					href={readMoreLink}
					className="ml-2 text-blue-600 underline cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						setShowFull(true);
					}}
				>
					{readMoreText}
				</a>
			)}
		</p>
	);
};

/**
 * Span component that applies text base styles.
 * @param {object} props - Props for the Span component.
 * @param {React.ReactNode} props.children - The content to display inside the span.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const Span = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<span className={cn("text-base", className)} {...props}>
		{children}
	</span>
);

/**
 * Small component for smaller text styles.
 * @param {object} props - Props for the Small component.
 * @param {React.ReactNode} props.children - The content to display inside the small tag.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const Small = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<small className={cn("text-sm", className)} {...props}>
		{children}
	</small>
);

/**
 * Large component for larger text styles.
 * @param {object} props - Props for the Large component.
 * @param {React.ReactNode} props.children - The content to display inside the large tag.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const Large = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<span className={cn("text-lg", className)} {...props}>
		{children}
	</span>
);

/**
 * Heading 1 component for large headers.
 * @param {object} props - Props for the H1 component.
 * @param {React.ReactNode} props.children - The content to display inside the h1 tag.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const H1 = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<h1 className={cn("text-4xl font-bold", className)} {...props}>
		{children}
	</h1>
);

/**
 * Heading 2 component for medium headers.
 * @param {object} props - Props for the H2 component.
 * @param {React.ReactNode} props.children - The content to display inside the h2 tag.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const H2 = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<h2 className={cn("text-3xl font-bold", className)} {...props}>
		{children}
	</h2>
);

/**
 * Heading 3 component for smaller headers.
 * @param {object} props - Props for the H3 component.
 * @param {React.ReactNode} props.children - The content to display inside the h3 tag.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const H3 = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<h3 className={cn("text-2xl font-bold", className)} {...props}>
		{children}
	</h3>
);

/**
 * Bold text component.
 * @param {object} props - Props for the Bold component.
 * @param {React.ReactNode} props.children - The content to display inside the bold tag.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const Bold = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<span className={cn("font-bold", className)} {...props}>
		{children}
	</span>
);

// Define the available themes in a TypeScript type
/**
 * The available syntax highlighter themes.
 * @typedef {'a11yDark' | 'a11yLight' | 'agate' | 'anOldHope' | 'androidstudio' | 'arduinoLight' | ... }
 */
export type HighlightTheme =
	| "a11yDark"
	| "a11yLight"
	| "agate"
	| "anOldHope"
	| "androidstudio"
	| "arduinoLight"
	| "arta"
	| "ascetic"
	| "atelierCaveDark"
	| "atelierCaveLight"
	| "atelierDuneDark"
	| "atelierDuneLight"
	| "atelierEstuaryDark"
	| "atelierEstuaryLight"
	| "atelierForestDark"
	| "atelierForestLight"
	| "atelierHeathDark"
	| "atelierHeathLight"
	| "atelierLakesideDark"
	| "atelierLakesideLight"
	| "atelierPlateauDark"
	| "atelierPlateauLight"
	| "atelierSavannaDark"
	| "atelierSavannaLight"
	| "atelierSeasideDark"
	| "atelierSeasideLight"
	| "atelierSulphurpoolDark"
	| "atelierSulphurpoolLight"
	| "atomOneDarkReasonable"
	| "atomOneDark"
	| "atomOneLight"
	| "brownPaper"
	| "codepenEmbed"
	| "colorBrewer"
	| "darcula"
	| "dark"
	| "defaultStyle"
	| "docco"
	| "dracula"
	| "far"
	| "foundation"
	| "githubGist"
	| "github"
	| "gml"
	| "googlecode"
	| "gradientDark"
	| "grayscale"
	| "gruvboxDark"
	| "gruvboxLight"
	| "hopscotch"
	| "hybrid"
	| "idea"
	| "irBlack"
	| "isblEditorDark"
	| "isblEditorLight"
	| "kimbieDark"
	| "kimbieLight"
	| "lightfair"
	| "lioshi"
	| "magula"
	| "monoBlue"
	| "monokaiSublime"
	| "monokai"
	| "nightOwl"
	| "nnfxDark"
	| "nnfx"
	| "nord"
	| "obsidian"
	| "ocean"
	| "paraisoDark"
	| "paraisoLight"
	| "pojoaque"
	| "purebasic"
	| "qtcreatorDark"
	| "qtcreatorLight"
	| "railscasts"
	| "rainbow"
	| "routeros"
	| "schoolBook"
	| "shadesOfPurple"
	| "solarizedDark"
	| "solarizedLight"
	| "srcery"
	| "stackoverflowDark"
	| "stackoverflowLight"
	| "sunburst"
	| "tomorrowNightBlue"
	| "tomorrowNightBright"
	| "tomorrowNightEighties"
	| "tomorrowNight"
	| "tomorrow"
	| "vs"
	| "vs2015"
	| "xcode"
	| "xt256"
	| "zenburn";

/**
 * Code component that renders syntax-highlighted code using a specific theme.
 *
 * @component
 * @example
 * // Example usage of the Code component with a theme
 * <Code theme="monokai" className="language-javascript">
 *   {`const sum = (a, b) => a + b;`}
 * </Code>
 *
 * @param {string} children - The code to be displayed.
 * @param {string} [className=''] - The className to determine the language of the code (e.g., `language-js`, `language-python`).
 * @param {boolean} [inline=false] - Whether the code should be inline (default is `false` for block code).
 * @param {HighlightTheme} [theme='vs'] - The theme to be applied for syntax highlighting. Default is 'vs'.
 *
 * @returns {JSX.Element} The rendered code block with syntax highlighting.
 */
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	a11yDark,
	a11yLight,
	agate,
	anOldHope,
	androidstudio,
	arduinoLight,
	arta,
	ascetic,
	atelierCaveDark,
	atelierCaveLight,
	atelierDuneDark,
	atelierDuneLight,
	atelierEstuaryDark,
	atelierEstuaryLight,
	atelierForestDark,
	atelierForestLight,
	atelierHeathDark,
	atelierHeathLight,
	atelierLakesideDark,
	atelierLakesideLight,
	atelierPlateauDark,
	atelierPlateauLight,
	atelierSavannaDark,
	atelierSavannaLight,
	atelierSeasideDark,
	atelierSeasideLight,
	atelierSulphurpoolDark,
	atelierSulphurpoolLight,
	atomOneDarkReasonable,
	atomOneDark,
	atomOneLight,
	brownPaper,
	codepenEmbed,
	colorBrewer,
	darcula,
	dark,
	defaultStyle,
	docco,
	dracula,
	far,
	foundation,
	githubGist,
	github,
	gml,
	googlecode,
	gradientDark,
	grayscale,
	gruvboxDark,
	gruvboxLight,
	hopscotch,
	hybrid,
	idea,
	irBlack,
	isblEditorDark,
	isblEditorLight,
	kimbieDark,
	kimbieLight,
	lightfair,
	lioshi,
	magula,
	monoBlue,
	monokaiSublime,
	monokai,
	nightOwl,
	nnfxDark,
	nnfx,
	nord,
	obsidian,
	ocean,
	paraisoDark,
	paraisoLight,
	pojoaque,
	purebasic,
	qtcreatorDark,
	qtcreatorLight,
	railscasts,
	rainbow,
	routeros,
	schoolBook,
	shadesOfPurple,
	solarizedDark,
	solarizedLight,
	srcery,
	stackoverflowDark,
	stackoverflowLight,
	sunburst,
	tomorrowNightBlue,
	tomorrowNightBright,
	tomorrowNightEighties,
	tomorrowNight,
	tomorrow,
	vs,
	vs2015,
	xcode,
	xt256,
	zenburn,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

/**
 * Code component with theme prop for syntax highlighting.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.children - The code to be highlighted.
 * @param {string} [props.className=''] - The language class for the code (e.g., 'language-js').
 * @param {boolean} [props.inline=false] - Whether the code is inline or block.
 * @param {HighlightTheme} [props.theme='vs'] - The syntax highlighting theme to be used.
 *
 * @returns {JSX.Element} The syntax-highlighted code block.
 */

interface CodeProps {
	children: string;
	className?: string;
	inline?: boolean;
	theme?: HighlightTheme;
}
const Code = ({
	children,
	className = "",
	inline = false,
	theme = "vs", // default theme
}: CodeProps) => {
	// Determine the language based on the className
	const language = className.replace("language-", "");

	// Theme map: maps theme name to actual theme object
	const themeMap: Record<HighlightTheme, any> = {
		a11yDark,
		a11yLight,
		agate,
		anOldHope,
		androidstudio,
		arduinoLight,
		arta,
		ascetic,
		atelierCaveDark,
		atelierCaveLight,
		atelierDuneDark,
		atelierDuneLight,
		atelierEstuaryDark,
		atelierEstuaryLight,
		atelierForestDark,
		atelierForestLight,
		atelierHeathDark,
		atelierHeathLight,
		atelierLakesideDark,
		atelierLakesideLight,
		atelierPlateauDark,
		atelierPlateauLight,
		atelierSavannaDark,
		atelierSavannaLight,
		atelierSeasideDark,
		atelierSeasideLight,
		atelierSulphurpoolDark,
		atelierSulphurpoolLight,
		atomOneDarkReasonable,
		atomOneDark,
		atomOneLight,
		brownPaper,
		codepenEmbed,
		colorBrewer,
		darcula,
		dark,
		defaultStyle,
		docco,
		dracula,
		far,
		foundation,
		githubGist,
		github,
		gml,
		googlecode,
		gradientDark,
		grayscale,
		gruvboxDark,
		gruvboxLight,
		hopscotch,
		hybrid,
		idea,
		irBlack,
		isblEditorDark,
		isblEditorLight,
		kimbieDark,
		kimbieLight,
		lightfair,
		lioshi,
		magula,
		monoBlue,
		monokaiSublime,
		monokai,
		nightOwl,
		nnfxDark,
		nnfx,
		nord,
		obsidian,
		ocean,
		paraisoDark,
		paraisoLight,
		pojoaque,
		purebasic,
		qtcreatorDark,
		qtcreatorLight,
		railscasts,
		rainbow,
		routeros,
		schoolBook,
		shadesOfPurple,
		solarizedDark,
		solarizedLight,
		srcery,
		stackoverflowDark,
		stackoverflowLight,
		sunburst,
		tomorrowNightBlue,
		tomorrowNightBright,
		tomorrowNightEighties,
		tomorrowNight,
		tomorrow,
		vs,
		vs2015,
		xcode,
		xt256,
		zenburn,
	};

	// Select the correct theme based on the passed `theme` prop
	const selectedTheme = themeMap[theme] || themeMap["vs"]; // Default to 'vs' theme if no valid theme is passed

	// If inline, return the code inside a <code> element, otherwise return a block code with syntax highlighting
	if (inline) {
		return <code className={className}>{children}</code>;
	}

	return (
		<SyntaxHighlighter language={language} style={selectedTheme}>
			{children}
		</SyntaxHighlighter>
	);
};

export const Pre = ({ children, ...props }: { children: React.ReactNode }) => (
	<div className="code-block" {...props}>
		{children}
	</div>
);

/**
 * Blockquote component for citations or quotes.
 * @param {object} props - Props for the Blockquote component.
 * @param {React.ReactNode} props.children - The content to display inside the blockquote.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
export const Blockquote = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<blockquote className={cn("text-base", className)} {...props}>
		{children}
	</blockquote>
);

export const Typography = {
	P,
	Span,
	Small,
	Large,
	H1,
	H2,
	H3,
	Bold,
	Code,
	Pre,
	Blockquote,
};
