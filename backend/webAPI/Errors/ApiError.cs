﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace webAPI.Errors
{
    public class ApiError
    {
        public ApiError()
        {

        }
        public ApiError(int errorCode, string errorMessage, string errorDetails=null)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            ErrorDetails = errorDetails;
        }

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }
        //public string PropertyNamingPolicy { get; private set; }

        public override string ToString()
        {
            var opts = new JsonSerializerOptions(){
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            return JsonSerializer.Serialize(this,opts);
        }

        
    }
}
