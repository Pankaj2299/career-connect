import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableSkeleton from '../skeleton/TableSkeleton'

function CompaniesTable() {
  const { companies,searchCompanyByText,loading } = useSelector(state => state.company)
  const [filterCompany,setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if(!searchCompanyByText){
        return true
      }; 
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany)

  },[companies,searchCompanyByText])

  if(loading) {
    return <TableSkeleton/>
  }

  return (
   
        <div className="overflow-x-auto">

      <Table>

        <TableCaption className="py-4 text-gray-500">
          List of your recently registered companies.
        </TableCaption>


        <TableHeader className="bg-gray-50">

          <TableRow className="hover:bg-gray-50">

            <TableHead className="w-24 pl-6">
              Logo
            </TableHead>

            <TableHead>
              Company Name
            </TableHead>

            <TableHead>
              Date
            </TableHead>

            <TableHead className="text-right pr-6">
              Action
            </TableHead>

          </TableRow>

        </TableHeader>


        <TableBody>

          {
            filterCompany.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-gray-500"
                >
                  {
                    companies.length === 0
                      ? "No companies found."
                      : "No companies match your search."
                  }
                </TableCell>

              </TableRow>

            ) : (

              filterCompany.map((company) => (

                <TableRow
                  key={company._id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  {/* Logo */}
                  <TableCell className="pl-6">

                    <Avatar className="h-11 w-11 border border-gray-200">

                      <AvatarImage
                        src={company.logo}
                        alt={company.name}
                      />

                      <AvatarFallback className="bg-blue-50 text-[#2563EB] font-semibold">
                        {company?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>

                    </Avatar>

                  </TableCell>


                  {/* Company Name */}
                  <TableCell>

                    <div>
                      <p className="font-semibold text-[#111827]">
                        {company.name}
                      </p>

                      {
                        company.location && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            {company.location}
                          </p>
                        )
                      }

                    </div>

                  </TableCell>


                  {/* Date */}
                  <TableCell className="text-gray-600">

                    {company.createdAt?.split("T")[0]}

                  </TableCell>


                  {/* Action */}
                  <TableCell className="text-right pr-6">

                    <Popover>

                      <PopoverTrigger asChild>

                        <button
                          type="button"
                          className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-gray-100 transition-colors"
                        >

                          <MoreHorizontal
                            size={20}
                            className="text-gray-600"
                          />

                        </button>

                      </PopoverTrigger>


                      <PopoverContent
                        align="end"
                        className="w-36 p-1"
                      >

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/recruiter/companies/${company._id}`)
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >

                          <Edit2 size={16} />

                          Edit

                        </button>

                      </PopoverContent>

                    </Popover>

                  </TableCell>

                </TableRow>

              ))

            )
          }

        </TableBody>

      </Table>

    </div>

  )
}

export default CompaniesTable
