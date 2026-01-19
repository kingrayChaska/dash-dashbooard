import Image from "next/image";

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

export default function CompaniesTable({ companies }: CompaniesTableProps) {
  return (
    <table className="w-full text-sm text-gray-200">
      <thead>
        <tr className="border-sm">
          <th className="text-left py-2">Company Name</th>
          <th className="text-left py-2">Reg. No</th>
          <th className="text-left py-2">Jobs</th>
          <th className="text-left py-2">Projects</th>
          <th className="text-left py-2">Courses</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr key={index} className="border-b text-gray-200">
            <td className="py-2 flex items-center">
              <Image
                src="https://via.placeholder.com/32"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full mr-2"
              />
              {company.name}
            </td>
            <td>{company.regNo}</td>
            <td>{company.jobs}</td>
            <td>{company.projects}</td>
            <td>{company.courses}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
