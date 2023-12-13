
import { Job, JobStatus } from "../../Models/Job";
import { User } from "../../Models/User";
import { Property } from "../../Models/Property";
import { View } from "react-native-ui-lib";
import { ScrollView, StyleSheet } from "react-native";
import JobCard from "./JobCard";
import { useGetJobs } from "./Hooks/useGetJobs";
const myUser: User = {
    id: 1,
    name: { firstName: "John", lastName: "Doe" },
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    dateOfBirth: new Date("1990-01-01"),
    reviewsGiven: [],
    reviewsReceived: [],
    professions: [],
    roles: [],
  };
  const myProperty: Property = {
    id: 1,
    name: "My Property",
    owner: myUser,
    location: {
      country: "United States",
      city: "New York",
      address: "123 Main St",
      postalCode: "10001",
      point: {
        x: 10,
        y: 20,
      },
    },
  };

  const job: Job = {
    id: 1,
    budget: 1000,
    owner: myUser,
    property: myProperty,
    datePosted: "2023-12-13",
    jobStatus: JobStatus.DRAFT,
    title: "My Job",
    description:
      "Job description hasdasadasd afg wres twaqt ert \n fads ar waerf wer far we\nereasdsas sdf atg aert \neart reat aresdtdfsta awesdrf \nawest tawetft ewarf waerf waerf asr ",
  };

  const job2: Job = {
    id: 1,
    budget: 1000,
    owner: myUser,
    property: myProperty,
    datePosted: "2023-12-10",
    jobStatus: JobStatus.DRAFT,
    title: "Job 2",
    description: "Hello World!",
  };
  const job3: Job = {
    id: 1,
    budget: 1000,
    owner: myUser,
    property: myProperty,
    datePosted: "2023-12-10",
    jobStatus: JobStatus.DRAFT,
    title: "Job 2",
    description:
      "asdasawaw4 t 4aw3qt w34t4 4w234uiq hrt4hw4t hnehnw4o2ir8 hjoi4w28hfhrt!",
  };


const JobsList: React.FC = () => {
    const jobs = useGetJobs();
    return (
      <ScrollView>
        <View flexG style={styles.container}>
            {jobs.map((job) => { return <JobCard key={job.id} job={job}></JobCard> })}
          {/* <JobCard job={job}></JobCard>
          <JobCard job={job2}></JobCard>
          <JobCard job={job3}></JobCard>
          <JobCard job={job2}></JobCard>
          <JobCard job={job}></JobCard>
          <JobCard job={job2}></JobCard>
          <JobCard job={job3}></JobCard>
          <JobCard job={job2}></JobCard>
          <JobCard job={job}></JobCard>
          <JobCard job={job2}></JobCard>
          <JobCard job={job}></JobCard>
          <JobCard job={job3}></JobCard>
          <JobCard job={job2}></JobCard> */}
        </View>
      </ScrollView>
    );
  }

  export default JobsList;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  });
  