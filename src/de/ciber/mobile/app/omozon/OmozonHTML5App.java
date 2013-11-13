/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package de.ciber.mobile.app.omozon;

import java.lang.reflect.Method;

import android.annotation.TargetApi;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;

import org.apache.cordova.*;

public class OmozonHTML5App extends DroidGap
{
	private int retryCount = 0;
	
	@Override
    public void onCreate(Bundle savedInstanceState)
    {
		super.onCreate(savedInstanceState);
//		super.setStringProperty("loadingDialog", "Please wait -- loading...");
//        super.init();
		
		if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1) {
    	    fixJellyBeanIssues();
    	}
    	
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }
    
    @TargetApi(16)
    protected void fixJellyBeanIssues() {    
        try {
        	System.out.println(super.appView.toString());
        	WebView webView = super.appView;
        	webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
            Class<?> clazz = webView.getSettings().getClass();
            Method method = clazz.getMethod("setAllowUniversalAccessFromFileURLs", boolean.class);
    	    if (method != null) {
    	        method.invoke(webView.getSettings(), true);
    	    }
        } catch(Exception e) {
            System.out.println(e.toString());
        }
    }

    // catch an error and if try again 1x or quit
    @Override
    public void onReceivedError( int errorCode, String description, String failingUrl)
    {
        if(retryCount < 3) {
            retryCount++;
            System.out.println("Connection failed, trying again. Retry Count: "+retryCount);
            super.loadUrl("file:///android_asset/www/index.html");
        } else {
            System.out.println("Sorry, it failed three times so I give up.");
            super.loadUrl("file:///android_asset/www/fail.html");
        }
        return;
    }
}

