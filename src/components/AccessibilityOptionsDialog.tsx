
"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Palette, Link as LinkIcon } from "lucide-react"; // Icons

interface AccessibilityOptionsDialogProps {
  children: ReactNode;
  onDialogClose?: () => void;
}

type FontSize = 'small' | 'medium' | 'large';
type ContrastMode = 'default' | 'high-contrast-light' | 'high-contrast-dark';

const AccessibilityOptionsDialog: React.FC<AccessibilityOptionsDialogProps> = ({ children, onDialogClose }) => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [contrastMode, setContrastMode] = useState<ContrastMode>('default');
  const [highlightLinks, setHighlightLinks] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedFontSize = localStorage.getItem('accessibility-font-size') as FontSize | null;
      const savedContrastMode = localStorage.getItem('accessibility-contrast-mode') as ContrastMode | null;
      const savedHighlightLinks = localStorage.getItem('accessibility-highlight-links');

      if (savedFontSize) setFontSize(savedFontSize);
      if (savedContrastMode) setContrastMode(savedContrastMode);
      if (savedHighlightLinks) setHighlightLinks(savedHighlightLinks === 'true');
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.dataset.fontSize = fontSize;
      localStorage.setItem('accessibility-font-size', fontSize);

      // Apply contrast mode by setting a data attribute on <html> and a class on <body>
      document.documentElement.dataset.contrast = contrastMode; // For potential CSS attribute selectors
      localStorage.setItem('accessibility-contrast-mode', contrastMode);
      document.body.classList.remove('high-contrast-light', 'high-contrast-dark', 'default-contrast'); // Clear previous contrast classes
      if (contrastMode === 'high-contrast-light') {
        document.body.classList.add('high-contrast-light');
      } else if (contrastMode === 'high-contrast-dark') {
        document.body.classList.add('high-contrast-dark');
      } else {
         document.body.classList.add('default-contrast'); // Add default class if needed
      }


      if (highlightLinks) {
        document.documentElement.dataset.highlightLinks = 'true';
      } else {
        delete document.documentElement.dataset.highlightLinks;
      }
      localStorage.setItem('accessibility-highlight-links', String(highlightLinks));
    }
  }, [fontSize, contrastMode, highlightLinks, isMounted]);

  const handleResetSettings = () => {
    setFontSize('medium');
    setContrastMode('default');
    setHighlightLinks(false);
    // Immediate application will be handled by the useEffect above
  };

  return (
    <Dialog onOpenChange={(isOpen) => {
      if (!isOpen && onDialogClose) {
        onDialogClose();
      }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {isMounted && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Accessibility Options</DialogTitle>
            <DialogDescription>
              Customize the website's appearance for your comfort and readability. Your preferences are saved locally.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Font Size */}
            <div className="space-y-2">
              <Label htmlFor="fontSize" className="text-base font-medium flex items-center">
                <SlidersHorizontal className="mr-2 h-5 w-5 text-primary" /> Font Size
              </Label>
              <RadioGroup
                id="fontSize"
                value={fontSize}
                onValueChange={(value: string) => setFontSize(value as FontSize)}
                className="flex space-x-2 rounded-md bg-muted p-1"
              >
                {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
                  <RadioGroupItem key={size} value={size} id={`fs-${size}`} className="sr-only" />
                ))}
                <Label
                  htmlFor="fs-small"
                  className={`flex-1 cursor-pointer rounded-md p-2 text-center text-sm transition-colors ${
                    fontSize === 'small' ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  Small
                </Label>
                 <Label
                  htmlFor="fs-medium"
                  className={`flex-1 cursor-pointer rounded-md p-2 text-center text-sm transition-colors ${
                    fontSize === 'medium' ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  Medium
                </Label>
                 <Label
                  htmlFor="fs-large"
                  className={`flex-1 cursor-pointer rounded-md p-2 text-center text-sm transition-colors ${
                    fontSize === 'large' ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  Large
                </Label>
              </RadioGroup>
            </div>

            {/* Contrast Mode */}
            <div className="space-y-2">
              <Label htmlFor="contrastMode" className="text-base font-medium flex items-center">
                <Palette className="mr-2 h-5 w-5 text-primary" /> Contrast Mode
              </Label>
              <RadioGroup
                id="contrastMode"
                value={contrastMode}
                onValueChange={(value: string) => setContrastMode(value as ContrastMode)}
                className="grid grid-cols-1 gap-2"
              >
                {(['default', 'high-contrast-light', 'high-contrast-dark'] as ContrastMode[]).map((mode) => (
                    <div key={mode} className="flex items-center">
                        <RadioGroupItem value={mode} id={`cm-${mode}`} />
                        <Label htmlFor={`cm-${mode}`} className="ml-2 cursor-pointer text-sm">
                            {mode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Label>
                    </div>
                ))}
              </RadioGroup>
            </div>

            {/* Highlight Links */}
            <div className="flex items-center justify-between space-x-2 py-2">
              <Label htmlFor="highlightLinks" className="text-base font-medium flex items-center">
                <LinkIcon className="mr-2 h-5 w-5 text-primary" /> Highlight Links
              </Label>
              <Switch
                id="highlightLinks"
                checked={highlightLinks}
                onCheckedChange={setHighlightLinks}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between gap-2 mt-2">
            <Button variant="outline" onClick={handleResetSettings} className="w-full sm:w-auto">Reset to Defaults</Button>
            <DialogClose asChild>
              <Button type="button" className="w-full sm:w-auto">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AccessibilityOptionsDialog;

    