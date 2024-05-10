package com.task.management.util;

public class EndpointBundle {
    public static final String BASE_URL = "/api/v1";
    public static final String TASKMANAGEMENT = BASE_URL + "/taskmanagement";
    public static final String CREATE_TASK = "/create";
    public static final String GET_ALL_TASKS = "/all";
    public static final String GET_TASK_BY_ID = "/get-by-id/{id}";
    public static final String UPDATE_TASK_BY_ID = "/update-by-id/{id}";
    public static final String UPDATE_STATUS_BY_ID = "/update-status-by-id/{id}";
    public static final String DELETE_TASK_BY_ID = "/delete-by-id/{id}";

}
