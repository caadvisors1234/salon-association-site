const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 組織情報の構造化データ
interface OrganizationJsonLdProps {
  phone?: string;
  address?: string;
  postalCode?: string;
}

export function OrganizationJsonLd({ phone, address, postalCode }: OrganizationJsonLdProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "一般社団法人AIビューティーサロン推進協会",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "description": "AIの力で美容業界の未来を共創する。サロン経営の効率化、顧客満足度の向上、新たな価値創造を支援します。",
    ...(phone && {
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": phone,
        "contactType": "customer service",
        "availableLanguage": "Japanese"
      }
    }),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JP",
      "addressLocality": "東京都",
      ...(postalCode && { "postalCode": postalCode }),
      ...(address && { "streetAddress": address })
    },
    "foundingDate": "2025",
    "keywords": ["AI", "美容サロン", "経営効率化", "集客", "リピート率向上", "採用"],
    "sameAs": [
      "https://twitter.com/ai_beauty_salon",
      "https://www.facebook.com/ai.beauty.salon"
    ]
  };

  return <JsonLd data={organizationData} />;
}

// ウェブサイト情報の構造化データ
export function WebsiteJsonLd() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIビューティーサロン推進協会",
    "url": siteUrl,
    "description": "AIビューティーサロン推進協会の公式ウェブサイト。AI技術を活用した美容サロンの経営支援、集客自動化、リピート率向上、採用最適化サービスを提供。",
    "inLanguage": "ja-JP",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLd data={websiteData} />;
}

// サービス情報の構造化データ
export function ServiceJsonLd() {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AIビューティーサロン支援サービス",
    "description": "AI技術を活用した美容サロンの経営支援サービス。集客自動化、リピート率向上、採用最適化の3つのコアソリューションを提供。",
    "provider": {
      "@type": "Organization",
      "name": "一般社団法人AIビューティーサロン推進協会"
    },
    "serviceType": "Business Consulting",
    "areaServed": "Japan",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${siteUrl}/services`
    }
  };

  return <JsonLd data={serviceData} />;
}

// 記事用の構造化データ
interface ArticleJsonLdProps {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  authorName?: string;
  imageUrl?: string;
  url: string;
}

export function ArticleJsonLd({
  title,
  description,
  publishedDate,
  modifiedDate,
  authorName = "AIビューティーサロン推進協会",
  imageUrl,
  url
}: ArticleJsonLdProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "author": {
      "@type": "Organization",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "一般社団法人AIビューティーサロン推進協会",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(imageUrl && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl
      }
    })
  };

  return <JsonLd data={articleData} />;
}

// FAQページ用の構造化データ
interface FAQJsonLdProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <JsonLd data={faqData} />;
}

// パンくずリスト用の構造化データ
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd data={breadcrumbData} />;
} 