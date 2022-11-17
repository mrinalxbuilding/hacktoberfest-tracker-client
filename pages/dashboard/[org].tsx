import Top from "../../components/top"
import { useRouter } from "next/router"
import Left from "../../components/left/left"
import { useEffect, useState } from "react"
import Sidebar from "../../components/sidebar/sidebarWrapper"
import RepoList from "../../components/repoList/repositoryList"
import OrgDash from "../../components/orgDash"


export default function Home() {

    const router = useRouter();
    const {org} = router.query;
    const url = "http://localhost:3060/"+org;
    const [data,setData] = useState({
        org:{
          orgName:'',
          orgDesc:''
        },
        orgData:{
          commits:0,
          issues:0,
          contributors:0,
          repoCount:0,
          repos:[{
            name:'',
            desc:'',
            topics:[''],
            link:''
          }]
      }
    });

    useEffect(() => {
        fetch(url,{
            'method': 'GET',
            'headers': {
                Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data);
        }
        );
        // console.log(url);
        
    },[]);

  return (
    <div className="flex flex-col">
      <Top/>
      <div className="h-[90vh] flex flex-row w-screen">
        <Sidebar orgName={data.org.orgName} data={data.orgData.repos}/>
        <div className="w-[80vw] flex flex-col p-6 h-full">
          <h1 className="font-semibold font-sans text-4xl mb-4">Repositories</h1>
          <RepoList repoData={data.orgData.repos}/>
          <h1 className="font-semibold font-sans text-4xl my-4">Contributions</h1>
          <OrgDash commits={data.orgData.commits} contributors={data.orgData.contributors} repoCount={data.orgData.repoCount} issues={data.orgData.issues}/>
        </div>
        <Left/>
      </div>
    </div>
  )
}
