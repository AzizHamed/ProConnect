import { emptySplitApi as api } from "./EmptyApi";
export const addTagTypes = [
  "Users",
  "Services",
  "Roles",
  "Reviews",
  "Properties",
  "Jobs",
  "JobOffers",
  "Category",
  "searches",
  "test-controller",
  "articles",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      rateUser: build.mutation<RateUserApiResponse, RateUserApiArg>({
        query: (queryArg) => ({
          url: `/users/RateUser`,
          method: "PUT",
          params: { userId: queryArg.userId, rating: queryArg.rating },
        }),
        invalidatesTags: ["Users"],
      }),
      updateProfile: build.mutation<
        UpdateProfileApiResponse,
        UpdateProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/users/update-profile`,
          method: "POST",
          body: queryArg.updateProfileRequest,
        }),
        invalidatesTags: ["Users"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/users/create`,
          method: "POST",
          body: queryArg.user,
        }),
        invalidatesTags: ["Users"],
      }),
      createUsers: build.mutation<CreateUsersApiResponse, CreateUsersApiArg>({
        query: (queryArg) => ({
          url: `/users/create-users`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Users"],
      }),
      addRole: build.mutation<AddRoleApiResponse, AddRoleApiArg>({
        query: (queryArg) => ({
          url: `/users/add-role`,
          method: "POST",
          params: { userId: queryArg.userId, roleId: queryArg.roleId },
        }),
        invalidatesTags: ["Users"],
      }),
      createUserServices: build.mutation<
        CreateUserServicesApiResponse,
        CreateUserServicesApiArg
      >({
        query: (queryArg) => ({
          url: `/services/create-user-services`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Services"],
      }),
      createUserService: build.mutation<
        CreateUserServiceApiResponse,
        CreateUserServiceApiArg
      >({
        query: (queryArg) => ({
          url: `/services/create-user-service`,
          method: "POST",
          body: queryArg.userServiceEntity,
        }),
        invalidatesTags: ["Services"],
      }),
      createService: build.mutation<
        CreateServiceApiResponse,
        CreateServiceApiArg
      >({
        query: (queryArg) => ({
          url: `/services/create-service`,
          method: "POST",
          params: {
            serviceName: queryArg.serviceName,
            professionId: queryArg.professionId,
          },
        }),
        invalidatesTags: ["Services"],
      }),
      createRole: build.mutation<CreateRoleApiResponse, CreateRoleApiArg>({
        query: (queryArg) => ({
          url: `/roles/create`,
          method: "POST",
          body: queryArg.role,
        }),
        invalidatesTags: ["Roles"],
      }),
      giveReview: build.mutation<GiveReviewApiResponse, GiveReviewApiArg>({
        query: (queryArg) => ({
          url: `/reviews/ReviewUser`,
          method: "POST",
          params: {
            reviewer: queryArg.reviewer,
            reviewed: queryArg.reviewed,
            score: queryArg.score,
          },
        }),
        invalidatesTags: ["Reviews"],
      }),
      createProperty: build.mutation<
        CreatePropertyApiResponse,
        CreatePropertyApiArg
      >({
        query: (queryArg) => ({
          url: `/properties/create-property`,
          method: "POST",
          body: queryArg.property,
        }),
        invalidatesTags: ["Properties"],
      }),
      postJobs: build.mutation<PostJobsApiResponse, PostJobsApiArg>({
        query: (queryArg) => ({
          url: `/jobs/post`,
          method: "POST",
          body: queryArg.createJobRequest,
        }),
        invalidatesTags: ["Jobs"],
      }),
      postJobOffer: build.mutation<PostJobOfferApiResponse, PostJobOfferApiArg>(
        {
          query: (queryArg) => ({
            url: `/jobOffers/PostOffer`,
            method: "POST",
            body: queryArg.jobOffer,
          }),
          invalidatesTags: ["JobOffers"],
        }
      ),
      createCategory: build.mutation<
        CreateCategoryApiResponse,
        CreateCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/category/create`,
          method: "POST",
          body: queryArg.category,
        }),
        invalidatesTags: ["Category"],
      }),
      getUsersByEmail: build.query<
        GetUsersByEmailApiResponse,
        GetUsersByEmailApiArg
      >({
        query: (queryArg) => ({
          url: `/users/usersByEmails`,
          params: { emails: queryArg.emails },
        }),
        providesTags: ["Users"],
      }),
      getAllUsersNumber: build.query<
        GetAllUsersNumberApiResponse,
        GetAllUsersNumberApiArg
      >({
        query: () => ({ url: `/users/users-num` }),
        providesTags: ["Users"],
      }),
      getUser: build.query<GetUserApiResponse, GetUserApiArg>({
        query: (queryArg) => ({
          url: `/users/get`,
          params: { userId: queryArg.userId },
        }),
        providesTags: ["Users"],
      }),
      getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
        query: () => ({ url: `/users/get-all` }),
        providesTags: ["Users"],
      }),
      findUserByProfession: build.query<
        FindUserByProfessionApiResponse,
        FindUserByProfessionApiArg
      >({
        query: (queryArg) => ({
          url: `/users/UserByProfession`,
          params: {
            professionName: queryArg.professionName,
            workAreas: queryArg.workAreas,
          },
        }),
        providesTags: ["Users"],
      }),
      getAllUsersByWorkArea: build.query<
        GetAllUsersByWorkAreaApiResponse,
        GetAllUsersByWorkAreaApiArg
      >({
        query: (queryArg) => ({
          url: `/users/FindByWorkArea`,
          params: { workAreas: queryArg.workAreas },
        }),
        providesTags: ["Users"],
      }),
      getSearchesNumbers: build.query<
        GetSearchesNumbersApiResponse,
        GetSearchesNumbersApiArg
      >({
        query: () => ({ url: `/searches/search` }),
        providesTags: ["searches"],
      }),
      getAllRoles: build.query<GetAllRolesApiResponse, GetAllRolesApiArg>({
        query: () => ({ url: `/roles/get-all` }),
        providesTags: ["Roles"],
      }),
      getProperties: build.query<GetPropertiesApiResponse, GetPropertiesApiArg>(
        {
          query: () => ({ url: `/properties/get-properties` }),
          providesTags: ["Properties"],
        }
      ),
      getLocations: build.query<GetLocationsApiResponse, GetLocationsApiArg>({
        query: () => ({ url: `/properties/get-locations` }),
        providesTags: ["Properties"],
      }),
      findJobByOwner: build.query<
        FindJobByOwnerApiResponse,
        FindJobByOwnerApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/getJobByUser`,
          params: {
            owner: queryArg.owner,
            jobPage: queryArg.jobPage,
            jobSearchCriteria: queryArg.jobSearchCriteria,
          },
        }),
        providesTags: ["Jobs"],
      }),
      getJobs: build.query<GetJobsApiResponse, GetJobsApiArg>({
        query: (queryArg) => ({
          url: `/jobs/get-job-page`,
          params: {
            jobPage: queryArg.jobPage,
            jobSearchCriteria: queryArg.jobSearchCriteria,
          },
        }),
        providesTags: ["Jobs"],
      }),
      getBestOffer: build.query<GetBestOfferApiResponse, GetBestOfferApiArg>({
        query: (queryArg) => ({
          url: `/jobOffers/getBestOffer`,
          params: { job: queryArg.job },
        }),
        providesTags: ["JobOffers"],
      }),
      init: build.query<InitApiResponse, InitApiArg>({
        query: () => ({ url: `/init` }),
        providesTags: ["test-controller"],
      }),
      getAllCategories: build.query<
        GetAllCategoriesApiResponse,
        GetAllCategoriesApiArg
      >({
        query: () => ({ url: `/category/getAll` }),
        providesTags: ["Category"],
      }),
      getAllArticles: build.query<
        GetAllArticlesApiResponse,
        GetAllArticlesApiArg
      >({
        query: () => ({ url: `/articles/getAllArticles` }),
        providesTags: ["articles"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type RateUserApiResponse = unknown;
export type RateUserApiArg = {
  userId: string;
  rating: number;
};
export type UpdateProfileApiResponse =
  /** status 200 OK */ UpdateProfileRequest;
export type UpdateProfileApiArg = {
  updateProfileRequest: UpdateProfileRequest;
};
export type CreateUserApiResponse = /** status 200 OK */ User;
export type CreateUserApiArg = {
  user: User;
};
export type CreateUsersApiResponse = /** status 200 OK */ User[];
export type CreateUsersApiArg = {
  body: User[];
};
export type AddRoleApiResponse = /** status 200 OK */ boolean;
export type AddRoleApiArg = {
  userId: string;
  roleId: number;
};
export type CreateUserServicesApiResponse =
  /** status 200 OK */ UserServiceEntity[];
export type CreateUserServicesApiArg = {
  body: UserServiceEntity[];
};
export type CreateUserServiceApiResponse =
  /** status 200 OK */ UserServiceEntity;
export type CreateUserServiceApiArg = {
  userServiceEntity: UserServiceEntity;
};
export type CreateServiceApiResponse = /** status 200 OK */ Service;
export type CreateServiceApiArg = {
  serviceName: string;
  professionId: number;
};
export type CreateRoleApiResponse = /** status 200 OK */ Role;
export type CreateRoleApiArg = {
  role: Role;
};
export type GiveReviewApiResponse = unknown;
export type GiveReviewApiArg = {
  reviewer: User;
  reviewed: User;
  score: number;
};
export type CreatePropertyApiResponse = /** status 200 OK */ Property;
export type CreatePropertyApiArg = {
  property: Property;
};
export type PostJobsApiResponse = /** status 200 OK */ Job;
export type PostJobsApiArg = {
  createJobRequest: CreateJobRequest;
};
export type PostJobOfferApiResponse = unknown;
export type PostJobOfferApiArg = {
  jobOffer: JobOffer;
};
export type CreateCategoryApiResponse = /** status 200 OK */ Category;
export type CreateCategoryApiArg = {
  category: Category;
};
export type GetUsersByEmailApiResponse = /** status 200 OK */ User[];
export type GetUsersByEmailApiArg = {
  emails: string[];
};
export type GetAllUsersNumberApiResponse = /** status 200 OK */ number;
export type GetAllUsersNumberApiArg = void;
export type GetUserApiResponse = /** status 200 OK */ User;
export type GetUserApiArg = {
  userId: string;
};
export type GetAllUsersApiResponse = /** status 200 OK */ User[];
export type GetAllUsersApiArg = void;
export type FindUserByProfessionApiResponse = /** status 200 OK */ User[];
export type FindUserByProfessionApiArg = {
  professionName: string;
  workAreas: "North" | "Haifa" | "Center" | "BeerShevaa" | "South";
};
export type GetAllUsersByWorkAreaApiResponse = /** status 200 OK */ User[];
export type GetAllUsersByWorkAreaApiArg = {
  workAreas: "North" | "Haifa" | "Center" | "BeerShevaa" | "South";
};
export type GetSearchesNumbersApiResponse = /** status 200 OK */ number;
export type GetSearchesNumbersApiArg = void;
export type GetAllRolesApiResponse = /** status 200 OK */ Role[];
export type GetAllRolesApiArg = void;
export type GetPropertiesApiResponse = /** status 200 OK */ Property[];
export type GetPropertiesApiArg = void;
export type GetLocationsApiResponse = /** status 200 OK */ Location[];
export type GetLocationsApiArg = void;
export type FindJobByOwnerApiResponse = /** status 200 OK */ Job[];
export type FindJobByOwnerApiArg = {
  owner: User;
  jobPage: JobPage;
  jobSearchCriteria: JobSearchCriteria;
};
export type GetJobsApiResponse = /** status 200 OK */ PageJob;
export type GetJobsApiArg = {
  jobPage: JobPage;
  jobSearchCriteria: JobSearchCriteria;
};
export type GetBestOfferApiResponse = /** status 200 OK */ JobOffer;
export type GetBestOfferApiArg = {
  job: Job;
};
export type InitApiResponse = unknown;
export type InitApiArg = void;
export type GetAllCategoriesApiResponse = /** status 200 OK */ Category[];
export type GetAllCategoriesApiArg = void;
export type GetAllArticlesApiResponse = /** status 200 OK */ Article[];
export type GetAllArticlesApiArg = void;
export type Name = {
  firstName?: string;
  lastName?: string;
};
export type Role = {
  id?: number;
  name: string;
  code: string;
};
export type UpdateProfileRequest = {
  name?: Name;
  phoneNumber?: string;
  accountStatus?: "SETUP" | "ACTIVE" | "DISABLED";
  roles?: Role[];
};
export type Category = {
  id?: number;
  name?: string;
  svgUri?: string;
};
export type Profession = {
  id?: number;
  name: string;
  description: string;
  svg: string;
  category: Category;
};
export type User = {
  id?: string;
  name: Name;
  email: string;
  numOfRates?: number;
  phoneNumber?: string;
  dateOfBirth?: string;
  rating?: number;
  experience?: number;
  roles?: Role[];
  profession?: Profession;
  accountStatus?: "SETUP" | "ACTIVE" | "DISABLED";
  photoUrl?: string;
  workAreas?: "North" | "Haifa" | "Center" | "BeerShevaa" | "South";
};
export type Service = {
  id?: number;
  name: string;
  profession?: Profession;
};
export type UserServiceEntity = {
  id?: number;
  description: string;
  service: Service;
  user: User;
  cost?: number;
};
export type Point = {
  x?: number;
  y?: number;
};
export type Location = {
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  point?: Point;
};
export type Property = {
  id?: number;
  name: string;
  owner?: User;
  location?: Location;
};
export type Comment = {
  commentId?: number;
  date: string;
  job?: Job;
  user?: User;
  numberOfReports?: number;
  jobId?: number;
};
export type Job = {
  id?: number;
  budget?: number;
  owner?: User;
  property?: Property;
  datePosted?: string;
  jobStatus?:
    | "Draft"
    | "Published"
    | "In Progress"
    | "Cancelled"
    | "Under Review"
    | "Requires Adjustments"
    | "Finished";
  title: string;
  description: string;
  likedUsers?: User[];
  photos?: string[];
  commentedUsers?: Comment[];
  neededProfessions?: Profession[];
  numberOfReports?: number;
};
export type CreateJobRequest = {
  job?: Job;
  propertyId?: number;
};
export type JobOffer = {
  id?: number;
  senderUser: User;
  receiverUser: User;
  bid: number;
  job: Job;
  title?: string;
  description?: string;
  accepted?: boolean;
};
export type JobPage = {
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: "ASC" | "DESC";
  sortBy?: string;
};
export type JobSearchCriteria = {
  budget?: number;
  jobStatus?:
    | "Draft"
    | "Published"
    | "In Progress"
    | "Cancelled"
    | "Under Review"
    | "Requires Adjustments"
    | "Finished";
  jobDateSearch?: "AllTime" | "Month" | "Week" | "Day" | "Hour";
};
export type SortObject = {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
};
export type PageableObject = {
  offset?: number;
  sort?: SortObject;
  pageSize?: number;
  pageNumber?: number;
  paged?: boolean;
  unpaged?: boolean;
};
export type PageJob = {
  totalPages?: number;
  totalElements?: number;
  size?: number;
  content?: Job[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};
export type Article = {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  ref?: string;
  imageuri?: string;
};
export const {
  useRateUserMutation,
  useUpdateProfileMutation,
  useCreateUserMutation,
  useCreateUsersMutation,
  useAddRoleMutation,
  useCreateUserServicesMutation,
  useCreateUserServiceMutation,
  useCreateServiceMutation,
  useCreateRoleMutation,
  useGiveReviewMutation,
  useCreatePropertyMutation,
  usePostJobsMutation,
  usePostJobOfferMutation,
  useCreateCategoryMutation,
  useGetUsersByEmailQuery,
  useGetAllUsersNumberQuery,
  useGetUserQuery,
  useGetAllUsersQuery,
  useFindUserByProfessionQuery,
  useGetAllUsersByWorkAreaQuery,
  useGetSearchesNumbersQuery,
  useGetAllRolesQuery,
  useGetPropertiesQuery,
  useGetLocationsQuery,
  useFindJobByOwnerQuery,
  useGetJobsQuery,
  useGetBestOfferQuery,
  useInitQuery,
  useGetAllCategoriesQuery,
  useGetAllArticlesQuery,
} = injectedRtkApi;
