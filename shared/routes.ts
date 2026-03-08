import { z } from 'zod';
import { 
  insertUserSchema, users,
  insertCompanySchema, companies,
  insertPlacedStudentSchema, placedStudents,
  insertInterviewExperienceSchema, interviewExperiences,
  insertResourceSchema, resources,
  loginSchema
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: loginSchema,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      }
    },
    register: {
      method: 'POST' as const,
      path: '/api/register' as const,
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.object({ message: z.string() })
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/me' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      }
    }
  },
  companies: {
    list: {
      method: 'GET' as const,
      path: '/api/companies' as const,
      responses: {
        200: z.array(z.custom<typeof companies.$inferSelect>()),
      }
    },
    create: {
      method: 'POST' as const,
      path: '/api/companies' as const,
      input: insertCompanySchema,
      responses: {
        201: z.custom<typeof companies.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/companies/:id' as const,
      input: insertCompanySchema.partial(),
      responses: {
        200: z.custom<typeof companies.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/companies/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      }
    }
  },
  placedStudents: {
    list: {
      method: 'GET' as const,
      path: '/api/placed-students' as const,
      responses: {
        200: z.array(z.custom<typeof placedStudents.$inferSelect>()),
      }
    },
    create: {
      method: 'POST' as const,
      path: '/api/placed-students' as const,
      input: insertPlacedStudentSchema,
      responses: {
        201: z.custom<typeof placedStudents.$inferSelect>(),
        400: errorSchemas.validation,
      }
    }
  },
  interviewExperiences: {
    list: {
      method: 'GET' as const,
      path: '/api/interview-experiences' as const,
      responses: {
        200: z.array(z.custom<typeof interviewExperiences.$inferSelect>()),
      }
    },
    create: {
      method: 'POST' as const,
      path: '/api/interview-experiences' as const,
      input: insertInterviewExperienceSchema,
      responses: {
        201: z.custom<typeof interviewExperiences.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    approve: {
      method: 'PATCH' as const,
      path: '/api/interview-experiences/:id/approve' as const,
      responses: {
        200: z.custom<typeof interviewExperiences.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    }
  },
  resources: {
    list: {
      method: 'GET' as const,
      path: '/api/resources' as const,
      responses: {
        200: z.array(z.custom<typeof resources.$inferSelect>()),
      }
    },
    create: {
      method: 'POST' as const,
      path: '/api/resources' as const,
      input: insertResourceSchema,
      responses: {
        201: z.custom<typeof resources.$inferSelect>(),
        400: errorSchemas.validation,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
