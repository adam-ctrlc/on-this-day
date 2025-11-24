import { useMemo } from "react";

const renderDescriptionWithLinks = (description, wikipediaLinks) => {
  let renderedDescription = description;

  if (wikipediaLinks && Array.isArray(wikipediaLinks)) {
    wikipediaLinks.forEach((link) => {
      const regex = new RegExp(`\\b${link.title}\\b`, "gi");
      renderedDescription = renderedDescription.replace(
        regex,
        `<a href="${link.wikipedia}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-2 font-medium transition-colors">${link.title}</a>`
      );
    });
  }

  return { __html: renderedDescription };
};

export default function EventCard({ year, description, wikipediaLinks }) {
  const htmlContent = useMemo(
    () => renderDescriptionWithLinks(description, wikipediaLinks),
    [description, wikipediaLinks]
  );

  return (
    <div className="group relative pl-8 pb-8 border-l-2 border-gray-100 dark:border-gray-800 last:border-l-0 last:pb-0">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-500 transition-colors duration-300"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
        <span className="text-2xl font-black text-gray-300 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tabular-nums">
          {year}
        </span>
        <div 
          className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={htmlContent}
        />
      </div>
    </div>
  );
}
