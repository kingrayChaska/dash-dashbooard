interface Company {
  name: string;
  regNo: string;
  jobs: number;
  projects: number;
  courses: number;
}

interface CompaniesTableProps {
  companies: Company[];
}

function CompanyInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
      <span
        className="text-[#c9a84c] text-xs font-semibold"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {initials}
      </span>
    </div>
  );
}

const colHeaders = ["Company Name", "Reg. No", "Jobs", "Projects", "Courses"];

export default function CompaniesTable({ companies }: CompaniesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#c9a84c]/15">
            {colHeaders.map((header) => (
              <th
                key={header}
                className="text-left py-3 px-2 text-[#6b7280] text-xs uppercase tracking-widest font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr
              key={index}
              className="border-b border-[#1a1a24] hover:bg-[#1a1a24] transition-colors duration-200 group"
            >
              <td className="py-3 px-2">
                <div className="flex items-center gap-2.5">
                  <CompanyInitials name={company.name} />
                  <span
                    className="text-[#d1d5db] font-medium group-hover:text-[#e8c96a] transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {company.name}
                  </span>
                </div>
              </td>
              <td
                className="py-3 px-2 text-[#6b7280] font-mono text-xs"
              >
                {company.regNo}
              </td>
              <td
                className="py-3 px-2 text-[#d1d5db]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {company.jobs}
              </td>
              <td
                className="py-3 px-2 text-[#d1d5db]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {company.projects}
              </td>
              <td
                className="py-3 px-2 text-[#d1d5db]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {company.courses}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}