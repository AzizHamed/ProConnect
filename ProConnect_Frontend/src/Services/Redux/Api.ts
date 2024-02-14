import { emptySplitApi as api } from "./EmptyApi";
export const addTagTypes = [
  "Jobs",
  "Users",
  "Services",
  "Roles",
  "Properties",
  "Professions",
  "test-controller",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      unlikePost: build.mutation<UnlikePostApiResponse, UnlikePostApiArg>({
        query: (queryArg) => ({
          url: `/jobs/unlike`,
          method: "PUT",
          params: { jobId: queryArg.jobId, userId: queryArg.userId },
        }),
        invalidatesTags: ["Jobs"],
      }),
      likePost: build.mutation<LikePostApiResponse, LikePostApiArg>({
        query: (queryArg) => ({
          url: `/jobs/like`,
          method: "PUT",
          params: { jobId: queryArg.jobId, userId: queryArg.userId },
        }),
        invalidatesTags: ["Jobs"],
      }),
      commentOnPost: build.mutation<
        CommentOnPostApiResponse,
        CommentOnPostApiArg
      >({
        query: (queryArg) => ({
          url: `/jobs/comment`,
          method: "PUT",
          body: queryArg.comment,
        }),
        invalidatesTags: ["Jobs"],
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
      createService1: build.mutation<
        CreateService1ApiResponse,
        CreateService1ApiArg
      >({
        query: (queryArg) => ({
          url: `/professions/create`,
          method: "POST",
          params: { name: queryArg.name, description: queryArg.description },
        }),
        invalidatesTags: ["Professions"],
      }),
      postJobs: build.mutation<PostJobsApiResponse, PostJobsApiArg>({
        query: (queryArg) => ({
          url: `/jobs/post`,
          method: "POST",
          body: queryArg.job,
        }),
        invalidatesTags: ["Jobs"],
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
      init: build.query<InitApiResponse, InitApiArg>({
        query: () => ({ url: `/init` }),
        providesTags: ["test-controller"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type UnlikePostApiResponse = /** status 200 OK */ string;
export type UnlikePostApiArg = {
  jobId: number;
  userId: string;
};
export type LikePostApiResponse = /** status 200 OK */ string;
export type LikePostApiArg = {
  jobId: number;
  userId: string;
};
export type CommentOnPostApiResponse = /** status 200 OK */ Comment;
export type CommentOnPostApiArg = {
  comment: Comment;
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
export type CreatePropertyApiResponse = /** status 200 OK */ Property;
export type CreatePropertyApiArg = {
  property: Property;
};
export type CreateService1ApiResponse = /** status 200 OK */ Profession;
export type CreateService1ApiArg = {
  name: string;
  description: string;
};
export type PostJobsApiResponse = /** status 200 OK */ string;
export type PostJobsApiArg = {
  job: Job;
};
export type GetUserApiResponse = /** status 200 OK */ User;
export type GetUserApiArg = {
  userId: string;
};
export type GetAllUsersApiResponse = /** status 200 OK */ User[];
export type GetAllUsersApiArg = void;
export type GetAllRolesApiResponse = /** status 200 OK */ Role[];
export type GetAllRolesApiArg = void;
export type GetPropertiesApiResponse = /** status 200 OK */ Property[];
export type GetPropertiesApiArg = void;
export type GetLocationsApiResponse = /** status 200 OK */ Location[];
export type GetLocationsApiArg = void;
export type GetJobsApiResponse = /** status 200 OK */ PageJob;
export type GetJobsApiArg = {
  jobPage: JobPage;
  jobSearchCriteria: JobSearchCriteria;
};
export type InitApiResponse = unknown;
export type InitApiArg = void;
export type Name = {
  firstName: string;
  lastName: string;
};
export type Role = {
  id?: number;
  name: string;
  code: string;
};
export type Review = {
  id?: number;
  score: number;
  reviewText: string;
  reviewer: User;
  reviewedUser: User;
  roleReviewed: Role;
  timestamp?: string;
};
export type User = {
  experience: number;
  rating: number;
  id?: string;
  name: Name;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  reviewsGiven?: Review[];
  reviewsReceived?: Review[];
  roles?: Role[];
  contractors?: User[];
  accountStatus?: "SETUP" | "ACTIVE" | "DISABLED";
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
export type Profession = {
  id?: number;
  name: string;
  description: string;
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
  commentedUsers?: Comment[];
  neededProfessions?: Profession[];
  numberOfReports?: number;
};
export type Comment = {
  commentId?: number;
  date: string;
  job?: Job;
  user?: User;
  numberOfReports?: number;
  jobId?: number;
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
export type SortObject = {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
};
export type PageableObject = {
  offset?: number;
  sort?: SortObject;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
  paged?: boolean;
};
export type PageJob = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: Job[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  pageable?: PageableObject;
  empty?: boolean;
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
export const {
  useUnlikePostMutation,
  useLikePostMutation,
  useCommentOnPostMutation,
  useCreateUserMutation,
  useCreateUsersMutation,
  useAddRoleMutation,
  useCreateUserServicesMutation,
  useCreateUserServiceMutation,
  useCreateServiceMutation,
  useCreateRoleMutation,
  useCreatePropertyMutation,
  useCreateService1Mutation,
  usePostJobsMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetAllRolesQuery,
  useGetPropertiesQuery,
  useGetLocationsQuery,
  useGetJobsQuery,
  useInitQuery,
} = injectedRtkApi;
