export default function JobDetailDescription({ description }: any) {
  const splitedDescription = description.split('\n\t').map(
    (
      part: string,
      index: number, // split the description function
    ) =>
      index === 0
        ? part.split('\n').map((str, index) =>
            str === '  Responsopilities:' ? (
              <p className="mt-8 mb-4 text-xl font-bold" key={index}>
                {str}
              </p>
            ) : str === 'Compensation & Benefits:' ? (
              <ul className="mt-8 mb-4 text-xl font-bold" key={index}>
                {str}
              </ul>
            ) : (
              <p className="text-[18px]" key={index}>
                {str}
              </p>
            ),
          )
        : part.split('. ').map((str, index) => (
            <li
              className="before:content-['\25A0'] before:-ml-3 before:mr-2 before:absolute before:text-[9px] before:text-gray-500 list-none"
              key={index}>
              {str}
            </li>
          )),
  );
  return <>{splitedDescription}</>;
}
