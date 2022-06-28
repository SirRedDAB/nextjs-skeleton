import {useEffect, useState} from 'react'
import type {MetaTypes as Types} from "./types";
import Head from 'next/head'

/**
 * Renders all relevant SEO `<meta>` and `<link>` elements.
 *
 * @param props
 * @constructor
 */
export const Meta = (props: Types) => {
	const {
		title,
		keywords,
		description,
		type,
		siteName,
		imageAltText,
		imageSource,
		twitterCard,
		author,
		publishDate
	} = props

	const [currentUrl, setCurrentUrl] = useState('')
	const [origin, setOrigin] = useState('')
	const canonical = props.canonical ?? currentUrl

	useEffect(() => {
		if (window.location.href !== currentUrl) {
			setCurrentUrl(window.location.href)
		}

		if (window.location.origin !== origin) {
			setOrigin(window.location.origin)
		}
	}, [currentUrl, origin])

	return (
		<Head>
			<link rel="canonical" href={canonical}/>
			<link rel="icon" href="/favicon.ico"/>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta charSet="utf-8"/>
			<meta name="robots" content="all"/>
			{keywords && <meta name="keywords" content={keywords}/>}
			<meta name="description" content={description}/>
			{author && <meta name="author" content={author}/>}
			{publishDate && <meta name="publish_date" property="og:publish_date" content={publishDate}/>}
			<meta property="og:url" content={currentUrl}/>
			{type && <meta property="og:type" content={type}/>}
			<meta property="og:site_name" content={siteName}/>
			<meta property="og:description" content={description}/>
			<meta property="og:title" content={title}/>
			{imageSource && <meta property="og:image" content={imageSource}/>}
			{imageSource && imageAltText && <meta property="og:image:alt" content={imageAltText}/>}
			{twitterCard && <meta name="twitter:card" content={twitterCard}/>}
			<meta name="twitter:title" content={title}/>
			<meta name="twitter:description" content={description}/>
			{imageSource && <meta name="twitter:image" content={imageSource}/>}
			{imageSource && imageAltText && <meta name="twitter:image:alt" content={imageAltText}/>}
		</Head>
	)
}
